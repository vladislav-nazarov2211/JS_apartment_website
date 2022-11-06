import SingleItem from "./singleItemModel";
import * as view from "./singleItemView"

export default async function(state) {
    state.singleItem = new SingleItem(state.routeParams);
    await state.singleItem.getItem();
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    // запуск прослушки событий
    
    //открытие модального окна
    document.querySelector('.button-order').addEventListener('click', () => {
        view.showModal();
    });
    //закрытие модального окна
    document.querySelector('.modal__close').addEventListener('click', () => {
        view.hideModal();
    });
    //закрытие модального окна кликом по overlay
    document.querySelector('.modal-wrapper').addEventListener('click', (e) => {
        if (e.target.closest('.modal')) {
            return null;
        } else {
            view.hideModal();
        }
    });

    //прослушка отправки формы

    document.querySelector('.modal__form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = view.getInput();
        await state.singleItem.submitForm(formData);
        
        const response = state.singleItem.response;

        if (response.message === "Bid Created") {
            alert('Ваша заявка успешна созана!');
            view.hideModal();
            view.clearInput();
        } else if (response.message === "Bid Not Created") {
            response.errors.forEach((item) => {
                alert(item);
            })
        }
    });

    // клик по кнопке - бобавить в избранное

    document.querySelector('#addToFavouriteBtn').addEventListener('click', () => {
        state.favourites.toggleFav(state.singleItem.id);
        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
    });
}