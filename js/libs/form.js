console.log('Init!');

// inputmask
const form = document.querySelector('.form');
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+5 (999) 999-99-99');
inputMask.mask(telSelector);

const validation = new JustValidate('.form');

validation
	.addField('.input_name', [
		{
			rule: 'minLength',
			value: 3,
		},
		{
			rule: 'maxLength',
			value: 30,
		},
		{
			rule: 'required',
			value: true,
			errorMessage: 'Enter your name!'
		}
	])

	.addField('.input_mail', [
		{
			rule: 'required',
			value: true,
			errorMessage: 'Email obligatory',
		},
		{
			rule: 'email',
			value: true,
			errorMessage: 'Enter correct Email',
		},
	])
	.addField('#formAgreement', [
		{
			rule: 'required',
		}

	])
	.addField('.input_tel', [
		{
			rule: 'required',
			value: true,
			errorMessage: 'Phone required',
		},
		{
			rule: 'function',
			validator: function () {
				const phone = telSelector.inputmask.unmaskedvalue();
				return phone.length === 10;
			},
			errorMessage: 'Please enter a valid phone number',
		},
	]).onSuccess((event) => {
		console.log('Validation passes and form submitted', event);

		let formData = new FormData(event.target);

		console.log(...formData);

		let xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log('Sent');
				}
			}
		}

		xhr.open('POST', 'mail.php', true);
		xhr.send(formData);

		event.target.reset();
	});