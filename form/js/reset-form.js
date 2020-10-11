(() => {
  const cleanButton = document.querySelector('.reset');
  const form = document.querySelector('form');

  const resetFields = (evt) => {
    evt.preventDefault();

    const inputs = document.querySelectorAll('input[type=text], input[type=email], input[type=password]');

    form.reset();
    inputs.forEach((current) => {
      current.value = '';
    });
  };

  cleanButton.addEventListener('click', resetFields);
})();
