(() => {
  function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  function drawUrl(id, count) {
    let tempUrl = 'https://deckofcardsapi.com/api/deck/replacewithid/draw/?count=replacewithcount';
    tempUrl = tempUrl.replace('replacewithid', id).replace('replacewithcount', count);
    return tempUrl;
  }

  const origUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  let deckid = 'rc7othcekbl6';
  let remain = 0;
  fetch(origUrl)
    .then(resp => resp.json())
    .then(function (data) {
      remain = data.remaining;
      deckid = data.deck_id;
      console.log('deck id: ', deckid);
      document.getElementById('did').append(deckid);
      // console.log('remaining: ', remain);
      return deckid;
    })
    .catch(function (error) {
      console.log(error);
    });


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
            let cardList = document.getElementById('cards');
            let li = createNode('li');
            let img = createNode('img');
            let span = createNode('span');
            img.src = card.image;
            span.innerHTML = `${card.value} of ${card.suit} <br>`;
            console.log('card code: ', card.code);
            li.appendChild(span);
            li.appendChild(img);
            cardList.appendChild(li);
            remain = data.remaining;
            return card;
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log('remaining: ', remain);
  }
  window.onload = () => {
    document
      .getElementById('form')
      .addEventListener('submit', drawCard);
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
