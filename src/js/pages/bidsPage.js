import bids from './../bids/bidsController'

export default function(state) {
    //очистка контейнера
    document.querySelector('#app').innerHTML = '';
    bids(state);
};