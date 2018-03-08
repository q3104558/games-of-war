(() => {
  // function createNode(element) {
  //   return document.createElement(element);
  // }

  // function append(parent, el) {
  //   return parent.appendChild(el);
  // }

  // fetch(newDeckUrl)
  //   .then(resp => resp.json())
  //   .then(function (data) {
  //     remain = data.remaining;
  //     deckid = data.deck_id;
  //     console.log('deck id: ', deckid);
  //     document.getElementById('did').append(deckid);
  //     // console.log('remaining: ', remain);
  //     return deckid;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });


  const compareCards = (card1, card2) => {
    let val1 = card1.code.substr(0, 1);
    let val2 = card2.code.substr(0, 1);
    let result1 = 0;
    let result2 = 0;
    switch (val1) {
      case 'A':
        result1 = 14;
        break;
      case 'K':
        result1 = 13;
        break;
      case 'Q':
        result1 = 12;
        break;
      case 'J':
        result1 = 11;
        break;
      case '0':
        result1 = 10;
        break;
      default:
        result1 = parseInt(val1, 10);
    }
    switch (val2) {
      case 'A':
        result2 = 14;
        break;
      case 'K':
        result2 = 13;
        break;
      case 'Q':
        result2 = 12;
        break;
      case 'J':
        result2 = 11;
        break;
      case '0':
        result2 = 10;
        break;
      default:
        result2 = parseInt(val2, 10);
    }
    if (result1 > result2) {
      return card1;
    } else if (result2 > result1) {
      return card2;
    }
    console.log('WAR!');
    return card1;
  }

  const saveCard = (card) => {
    if (card > 1) {
      return true
    }
    return false
  }

  function drawUrl(id, count) {
    let tempUrl = 'https://deckofcardsapi.com/api/deck/replacewithid/draw/?count=replacewithcount';
    tempUrl = tempUrl.replace('replacewithid', id).replace('replacewithcount', count);
    return tempUrl;
  }

  const newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  let deckid = localStorage.getItem('deckid') || 'rc7othcekbl6';
  let remain = 52;

  const newDeckId = (event) => {
    event.preventDefault();
    fetch(newDeckUrl)
      .then(resp => resp.json())
      .then(function (data) {
        remain = data.remaining;
        deckid = data.deck_id;
        console.log('deck id: ', deckid);
        localStorage.setItem('deckid', deckid);
        document.getElementById('did').innerHTML = deckid;
        let cardList = document.getElementById('cards-list');
        while (cardList.firstChild) {
          cardList.removeChild(cardList.firstChild);
        }
        // console.log('remaining: ', remain);
        return deckid;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const makeCard = (card) => {
    let actualCard = `${card.value} of ${card.suit}`;
    let shortCard = card.code;
    let li = document.createElement('li');
    let div = document.createElement('div');
    div.className = 'col s12 m7';
    let div0 = document.createElement('div');
    div0.className = 'card horizontal';
    let div1 = document.createElement('div');
    div1.className = 'card-image';
    let img = document.createElement('img');
    img.src = card.image;
    // img.height = 157;
    // img.width = 113;
    // let title = document.createElement('span');
    // title.className = 'card-title red-text text-darken-4';
    // title.innerHTML = shortCard;
    let div4 = document.createElement('div');
    div4.className = 'card-stacked'
    let div2 = document.createElement('div');
    div2.className = 'card-content';
    let desc = document.createElement('p');
    desc.className = 'red-text';
    desc.innerHTML = `This card is the ${actualCard}.`;
    let div3 = document.createElement('div');
    div3.className = 'card-action'
    let clicker = document.createElement('a');
    clicker.className = 'btn-floating btn-large waves-effect waves-light red';
    let i = document.createElement('i');
    i.className = 'material-icons';
    i.innerHTML = 'add';
    clicker.name = shortCard;
    clicker.appendChild(i);
    div1.appendChild(img);
    // div1.appendChild(title);
    div2.appendChild(desc);
    div3.appendChild(clicker);
    div4.appendChild(div2);
    div4.appendChild(div3);
    div0.appendChild(div1);
    div0.appendChild(div2);
    div0.appendChild(div4);
    div.appendChild(div0);
    li.appendChild(div);
    return li;
    // let span = document.createElement('span');
    // img.src = card.image;
    // img.height = 157;
    // img.width = 113;
    // title.className = 'card-title';
    // title.innerHTML = actualCard;
    // img.className = 'center-align';
    // span.className = 'center-align red-text text-darken-3';
    // span.innerHTML = `${card.value} of ${card.suit}<br>`;
    // li.appendChild(span);
    // li.appendChild(img);
  }

  // let cardList = document.getElementById('cards');
  const drawCard = (event) => {
    event.preventDefault()
    if (remain > 0) {
      fetch(drawUrl(deckid, document.getElementById('draw-count').value))
        .then(resp => resp.json())
        .then(function (data) {
          let cards = data.cards;
          remain = data.remaining;
          return cards.map(function (card) {
            let cardList = document.getElementById('cards-list');
            // let li = document.createElement('li');
            // let img = document.createElement('img');
            // let span = document.createElement('span');
            // img.src = card.image;
            // img.height = 157;
            // img.width = 113;
            // img.className = 'center-align'
            // span.className = 'center-align red-text text-darken-3';
            // span.innerHTML = `${card.value} of ${card.suit}<br>`;
            // li.appendChild(span);
            // li.appendChild(img);
            console.log('card code: ', card.code);
            let cardResult = makeCard(card);
            cardList.appendChild(cardResult);
            remain = data.remaining;
            console.log('remaining: ', remain);
            return card;
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // console.log('remaining: ', remain);
  }

  window.onload = () => {
    document
      .getElementById('form')
      .addEventListener('submit', drawCard);
    document
      .getElementById('new-deck')
      .addEventListener('click', newDeckId);
    document
      .getElementById('did')
      .innerHTML = deckid;
  }
})()



// function drawCard() {
//   if (remain > 0) {
//     fetch(drawUrl(deckid, moreCards.value))
//       .then(resp => resp.json())
//       .then(function (data) {
//         let cards = data.cards;
//         return cards.map(function (card) {
//           let li = createNode('li');
//           let img = createNode('img');
//           let span = createNode('span');
//           img.src = card.image;
//           span.innerHTML = `${card.value} of ${card.suit}\n`;
//           console.log('card code: ', card.code);
//           append(li, span);
//           append(li, img);
//           append(cardList, li);
//           console.log('remaining: ', data.remaining)
//           return card
//         })
//       })
//       .catch(function (error) {
//         console.log(error)
//       });
//   }
//   else {
//     console.log('remaining: ', remain)
//   }
// }
//
// fetch(drawUrl(deckid, 2))
//   .then(resp => resp.json())
//   .then(function (data) {
//     let cards = data.cards;
//     return cards.map(function (card) {
//       let li = createNode('li');
//       let img = createNode('img');
//       let span = createNode('span');
//       img.src = card.image;
//       span.innerHTML = `${card.value} of ${card.suit}\n`;
//       console.log('card code: ', card.code);
//       append(li, span);
//       append(li, img);
//       append(cardList, li);
//       console.log('remaining: ', data.remaining)
//       return card
//     })
//   })
//   .catch(function (error) {
//     console.log(error)
//   });

// let { authors } = data.results;
// return authors.map(function (author) {
//   let li = createNode('li');
//   let img = createNode('img');
//   let span = createNode('span');
//   img.src = author.picture.medium;
//   span.innerHTML = `${author.name.first} ${author.name.last}`;
//   append(li, img);
//   append(li, span);
//   append(ul, li);
// })
