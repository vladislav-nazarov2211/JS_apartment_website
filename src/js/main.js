import homapage from './pages/homapage'
import singleItem from './pages/singleItem'
import favouritesPage from './pages/favouritesPage'
import bidsPage from './pages/bidsPage'
import errorPage from './pages/errorPage'
import EventEmitter from './utils/EventEmitter'
import Favourites from './favourites/favouritesModel'


const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites
};

window.state = state

const routes = [
    {path: '/', component: homapage},
    {path: 'item', component: singleItem},
    {path: 'favourites', component: favouritesPage},
    {path: 'bids', component: bidsPage},
];

function findComponentByPath(path, routes) {
    return routes.find((item) => {
        return item.path === path;
    })
};

function router() {
    const pathArray = location.hash.split('/');

    let currentPath = pathArray[0] === '' ? '/' : pathArray[1];
    currentPath = currentPath === '' ? '/' : currentPath;

    //save route params for singleItem 

    state.routeParams = pathArray[2] ? pathArray[2] : '';

    const {component = errorPage} = findComponentByPath(currentPath, routes) || {};

    component(state);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);