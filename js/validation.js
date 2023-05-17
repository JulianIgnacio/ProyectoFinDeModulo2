(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  const validateGroup = document.getElementsByClassName('validate-me');
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        for (let i = 0; i < validateGroup.length; i++) {
          let invalidGroup = validateGroup[i].querySelectorAll(':invalid');
          for (let j = 0; j < invalidGroup.length; j++) {
            invalidGroup[j].classList.add('is-invalid');
            invalidGroup[j].addEventListener(
              'input',
              (e) => e.target.classList.remove('is-invalid'),
              { once: true }
            );
          }
        }
      },
      false
    );
  });
})();
