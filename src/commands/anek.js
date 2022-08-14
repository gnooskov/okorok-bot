import axios from 'axios';
import jsdom from 'jsdom';

export const anek = (message) => {
  const onError = () => {
    message.reactions.removeAll(); // no permissions yet
    message.react('⛔');
  };

  message.react('👌');

  axios.get('https://www.anekdot.ru/random/anekdot/')
    .then(res => {
      if (!res?.data) {
        if (message) {
          message.channel.send('Сервер не прислал даунский анек');
        }
        return;
      }
      let allAneks;
      try {
        const parsedDoc = new jsdom.JSDOM(res.data);
        allAneks = parsedDoc.window.document.querySelectorAll('.topicbox');
      } catch (e) {
        onError();
        console.log(e);
      }
      if (!allAneks) {
        return;
      }

      let bestRating = -Infinity;
      let bestText = '';

      allAneks.forEach((anek) => {
        try {
          const ratingElement = anek.querySelector('.rates');
          if (!ratingElement) {
            return;
          }
          const ratingData = ratingElement.getAttribute('data-r');
          const ratingArray = ratingData.split(';');
          const ratingValue = parseInt(ratingArray[0]);
          if (ratingValue > bestRating) {
            bestRating = ratingValue;
            bestText = anek.querySelector('.text').innerHTML;
          }
        } catch (e) {
          onError();
          console.log(e);
        }
      });

      if (message && bestText) {
        bestText = bestText.replaceAll('<br>', '\n');
        bestText = bestText.replace(/<[^>*]>/g, ''); // strip other tags
        message.channel.send(bestText);
      }
    })
    .catch((e) => {
      onError();
      console.log('catch was', e);
      // message.channel.send('Не удалось получить даунский анек');
    })
}
