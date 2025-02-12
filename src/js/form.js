(function ($) {

    $("form").on('submit', function () {

        let form = $(this),
            emailApprove = 0;

        // Удаляем предыдущие ошибки
        form.find('.error').remove();
        form.find('.required').removeClass('required');

        let actionValue = form.find('input[name="action"]').val();

        // Проверка полей
        form.find('input[data-required], textarea[data-required], select[data-required]').each(function () {
            let errorText = $(this).attr('data-error') || 'This field is required';

            if ($(this).is(':checkbox')) {
                // Проверка чек-боксов
                if (!$(this).is(':checked')) {
                    $(this).closest('.inp-wrp').append(`<div class="error">${errorText}</div>`);
                    $(this).addClass('required');
                }
            } else {
                // Проверка текстовых полей и textarea
                if (!$(this).val().trim()) {
                    $(this).closest('.inp-wrp').append(`<div class="error">${errorText}</div>`);
                    $(this).addClass('required');
                }
            }

        });

        // Проверка email (если присутствует)
        form.find('input.inp-email').each(function () {
            let emailInput = $(this),
                pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if (emailInput.val().trim() && !pattern.test(emailInput.val())) {
                emailInput.closest('.inp-wrp').append(`<div class="error">Invalid email address</div>`);
                emailInput.addClass('required');
                emailApprove = 0;
            } else {
                emailApprove = 1;
            }
        });

        // Если есть ошибки, отменяем отправку
        if (form.find('.required').length || emailApprove === 0) {

            // Не скролить, если popup form окна
            const validActions = ['call', 'consult', 'work_offer', 'order_products_one_click'];
            if (!validActions.includes(actionValue)) {
                const $firstError = form.find('.required').first();
                if ($firstError.length) {
                    App.scrollTopBody($firstError, 96, 600);
                }
            }
            return false;
        }

        // Ваш AJAX-запрос
        $.ajax({
            type: "POST",
            url: "/mailer/mail.php",
            data: form.serialize(),
            cache: false,
            success: function () {
                $('#thanks-popup').show();
                form[0].reset(); // Сбрасываем форму
            },
            error: function () {
                alert('Error occurred while submitting the form.');
            }
        });

        return false; // Предотвращаем стандартную отправку формы
    });
    

    // Удаление ошибок при фокусе/изменении
    $('input, textarea, select').on('click focus change', function () {
        $(this).removeClass('required');
        $(this).closest('.inp-wrp').find('.error').remove();
    });
    
    $('.input-group input').each(function() {
        // Проверяем при загрузке
        if ($(this).val()) {
        $(this).next('label').addClass('active');
        }
    });
    
    $('.input-group input').on('focus blur input', function() {
        var label = $(this).next('label');
        if ($(this).val() || $(this).is(':focus')) {
        label.addClass('active');
        } else {
        label.removeClass('active');
        }
    });

})(jQuery);