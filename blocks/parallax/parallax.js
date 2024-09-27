/* eslint-disable no-use-before-define, object-curly-newline, function-paren-newline */
import { div } from '../../scripts/dom-helpers.js';
import { setBackgroundImage } from '../../scripts/utils.js';

export default function decorate(block) {
  // remove existing parallax
  document.querySelector('main .parallax-wrapper').remove();
  document.querySelector('main > .section').classList.remove('parallax-container');

  // format entire page as parallax
  const parallaxPageContent = div({ id: 'parallax-page-content' });
  const parallaxPageWrapper = div({ id: 'parallax-page-wrapper' },
    parallaxPageContent,
  );

  const pageContentFrag = document.createDocumentFragment();
  while (document.body.firstChild) pageContentFrag.append(document.body.firstChild);
  parallaxPageContent.append(pageContentFrag);

  // append the wrapper back to the body
  document.body.append(parallaxPageWrapper);

  const $parallax = div({ id: 'parallax' });
  let $content;

  [...block.children].forEach((row, i) => {
    if (i === 0) {
      $content = div({ class: 'layer content-0' }, row.childNodes[1]);
      $parallax.append($content);
    } else {
      const imgSrc = row.querySelector('img').src;
      const $img = div({ class: `layer img-${i}` });
      setBackgroundImage($img, imgSrc, [{ width: '200px' }]);
      $parallax.append($img);
    }
  });

  const $overlay = div({ class: 'overlay' });
  $parallax.append($overlay);
  parallaxPageWrapper.prepend($parallax);

  $parallax.classList.add('loaded');

  setTimeout(() => {
    $content.classList.add('animate');
  }, 1000);
}
