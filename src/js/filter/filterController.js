import Filter from './filterModel'
import * as view from './filterView'

export default async function(state) {
        
    if (!state.filter) {
        state.filter = new Filter
    }
    await state.filter.getParams();
    //отрисовка фильтра при запуске
    view.render(state.filter.params);
    //делаем запрос на сервер
    await state.filter.getResults();
    state.results = state.filter.result
    //обновление счетчика на кнопке
    view.changeButtonText(state.filter.result.length);

    //прослушка событий формы
    const form = document.querySelector('#filter-form');
    
    //изменение формы

    form.addEventListener('change', async function(e) {
        e.preventDefault();
        state.filter.query = view.getInput();
        await state.filter.getResults();
        state.results = state.filter.result;
        view.changeButtonText(state.filter.result.length);
    });

    //сброс формы

    form.addEventListener('reset', async function() {
        state.filter.query = '';
        await state.filter.getResults();
        view.changeButtonText(state.filter.result.length);
    });

    // отправка формы

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        state.emitter.emit('event:render-listing', {});
    });
};