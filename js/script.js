/* eslint-disable */

'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* remove class 'active' from all article links  DONE */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link DONE */

  clickedElement.classList.add('active');

  /* remove class 'active' from all articles DONE */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');


  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  let html = '';


  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */ /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


    /* insert link into titleList */

    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(){
  const params = math.Min(999999),math.Max(0);

}

function generateTags(){
  const optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optArticleSelector = '.post';

  /*Create a new variable allTags with an empty object*/
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
  /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);
  /* make html variable with empty string */
    let html = '';
  /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
  /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
  /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

  /* generate HTML of the link */
    const linkHTML = '<li><a href="#tag-' + tag + '">'+ tag +'</a>&nbsp</li>';

  /* add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag  to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag] ++;
      }

  /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:',tagsParams);

  /* [NEW] Create variable for all links html code */
  let allTagsHTML = '';
  /*[NEW] START LOOP: for each tag in allTags:*/
  for (let tag in allTags){
    /*NEW Generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-'+tag+'"> '+ tag +'</a>('+ allTags[tag] +')</li>';
    /*NEW End loop for each tag in allTags*/
  }
  /*NEW add html from allTagsHTML to tagList*/
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  /* find all tag links with class active */
  const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let tagActive of tagsActive){
    /* remove class active */
    tagActive.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="'+href+'"]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
}
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');


}

function addClickListenersToTags(){
  /* find all links to tags */
const links = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for(let link of links)
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link  */
}

addClickListenersToTags();


function generateAuthors (){
  const optArticleAuthorSelector = '.post-author',
  optArticleSelector = '.post';
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    /* find Author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTML = 'by&nbsp<a href="'+articleAuthor+'">'+articleAuthor+'</a>';

    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of the link into the author wrapper */
    authorWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
  }

generateAuthors ();

function authorClickHandler (event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="'+href+'"]');
  /* START LOOP: for each found author link */
  for(let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="'+href+'"]');

  }
function addClickListenersToAuthors () {
  /* find all links to Authors */
  const links = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
  }

  addClickListenersToAuthors();
