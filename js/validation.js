// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Get all form-groups in need of validation
  const validateGroup = document.getElementsByClassName('validate-me');

  // Loop over them and prevent submission
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
