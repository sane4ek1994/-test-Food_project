import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Скоро мы свами свяжемся!',
        oops: 'Что-то пошло не так...?'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            //Создаем элемент на странице и добавляем стили
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage); // Помещаем элемент на страницу 

            const formData = new FormData(form); // Собираем данные в JS для отправки на сервер

            //formData обрабатываем в JSON.  PHP файл тоже нужно донастроить!
            const json = JSON.stringify(Object.fromEntries(formData.entries())); //првщ formData снчла в [] в {} в JSN

            // Используем feth() и Promis для работы с сервером
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.succes);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.oops);
            })
            .finally(() => {
                form.reset();
            });

        });   
    }

    function showThanksModal(message) {
        // Открываем модельное окно без контента
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);
        // Создаем нужный нам контент
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        //Закидываем весь контент на страницу
        document.querySelector('.modal').append(thanksModal);
        //Вешаем таймаут
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        },4000);
    }
}

export default forms;