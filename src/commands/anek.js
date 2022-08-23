import axios from 'axios';
import jsdom from 'jsdom';
import { decode } from 'html-entities';

export const anek = (message) => {
  const onError = () => {
    message.reactions.removeAll(); // no permissions yet
    message.react('⛔');
  };

  axios.get('https://www.anekdot.ru/random/anekdot/')
    .then(res => {
      if (!res?.data) {
        if (message) {
          message.channel.send('Ошибка: сервер не прислал тупой анек');
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
            const html = anek.querySelector('.text').innerHTML;
            if (html.length < 2000) { // discord's message limit
              bestRating = ratingValue;
              bestText = html;
            }
          }
        } catch (e) {
          onError();
          console.log(e);
        }
      });

      if (message && bestText) {
        bestText = decode(bestText);
        bestText = bestText.replaceAll('<br>', '\n');
        bestText = bestText.replace(/<[^>*]>/g, ''); // strip other tags
        message.channel.send(bestText);
      }
    })
    .catch((e) => {
      onError();
      console.log('catch was', e);
      // message.channel.send('Ошибка: не удалось получить тупой анек');
    })
}
