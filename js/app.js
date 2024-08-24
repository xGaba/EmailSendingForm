document.addEventListener('DOMContentLoaded', () => {

    console.log('Document ready')

//OBJECTS

const email = {
    email: '',
    cc: '',
    asunto: '',
    mensaje: ''
}


//VARIABLES - SELECTORES

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    const inputCc = document.querySelector('#cc')



//EVENTOS

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputCc.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    })

//FUNCIONES
   
    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden')
        
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            // Crear el enlace mailto
            const emailTo = email.email;
            const subject = encodeURIComponent(email.asunto);
            const body = encodeURIComponent(email.mensaje);
            let mailtoLink = `mailto:${emailTo}?subject=${subject}&body=${body}`;

            // Si el campo CC tiene contenido, lo añadimos al enlace mailto
            if (email.cc) {
                const cc = encodeURIComponent(email.cc);
                mailtoLink += `&cc=${cc}`;
            }

            // Abrir la aplicación de correo predeterminada con los datos del formulario
            window.location.href = mailtoLink;

            resetFormulario();

            //Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }    

    function validar(e) { 
        
        //Validar campos si hay escrito o no
        if  (e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        //Validar si el formato del campo email es válido
        if (e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El campo email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        //Validar si el formato del campo CC es válido
        if (e.target.id === 'cc' && !validarEmail(e.target.value)){
            mostrarAlerta('El campo CC no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);
        
        //Asignar los valores al Objeto 
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //Comprobar el Objeto email
        comprobarEmail()
    
    };

    //Alerta en caso de campo obligatorio vacío
    function mostrarAlerta(mensaje, referencia) {
    
        limpiarAlerta(referencia)

        //Generando HTML de alerta
        const error = document.createElement('DIV');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'p-2', 'text-white', 'text-center', 'error')
        referencia.appendChild(error)

        if(mensaje === 'El campo cc es obligatorio'){
            limpiarAlerta(referencia)
        }
    }

    //Limpiando HMTL previo a generar más
    function limpiarAlerta(referencia) {
       const alerta = referencia.querySelector('.error');
       if(alerta){
        alerta.remove();
       }
    }

    function validarEmail(email){

        //Regular expresion para validar email
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado
    };
 
    function comprobarEmail(){
        if (!email.email || !email.asunto || !email.mensaje){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario () {
        //Reiniciamos el objeto
        email.email = '';
        email.cc= '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }
});

