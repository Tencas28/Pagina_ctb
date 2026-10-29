// Función 1: menú móvil (abrir/cerrar y cerrar al elegir un enlace)
function iniciarMenu() {
    const boton = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    boton.addEventListener('click', () => {
        const abierto = menu.classList.toggle('abierto');
        boton.setAttribute('aria-expanded', abierto);
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.remove('abierto');
        boton.setAttribute('aria-expanded', 'false');
    }));
}

// Función 2: los botones de las tarjetas llenan el servicio en el formulario
function iniciarCotizador() {
    const select = document.getElementById('servicio');
    document.querySelectorAll('.cotizar').forEach(btn => {
        btn.addEventListener('click', () => {
            select.value = btn.dataset.servicio;
            select.classList.remove('invalido');
            document.getElementById('contacto').scrollIntoView();
            document.getElementById('nombre').focus({ preventScroll: true });
        });
    });
}

// Función 3: validación del formulario con mensajes por campo
function iniciarFormulario() {
    const form = document.getElementById('formulario');
    const estado = document.getElementById('estado');
    const reglas = {
        nombre: v => v.trim().length >= 3 || 'Escribe tu nombre (mínimo 3 letras).',
        correo: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Escribe un correo válido.',
        servicio: v => v !== '' || 'Elige un servicio.',
        mensaje: v => v.trim().length >= 10 || 'Cuéntanos tu idea (mínimo 10 caracteres).'
    };
    form.addEventListener('submit', e => {
        e.preventDefault();
        let valido = true;
        Object.keys(reglas).forEach(campo => {
            const input = form.elements[campo];
            const resultado = reglas[campo](input.value);
            const aviso = form.querySelector(`[data-for="${campo}"]`);
            aviso.textContent = resultado === true ? '' : resultado;
            input.classList.toggle('invalido', resultado !== true);
            if (resultado !== true) valido = false;
        });
        estado.textContent = valido
            ? `¡Gracias, ${form.elements.nombre.value.trim()}! Recibimos tu mensaje y te escribiremos pronto.`
            : '';
        if (valido) form.reset();
    });
}

// Función 4: visor de galería con navegación por botones y teclado
function iniciarGaleria() {
    const fotos = [...document.querySelectorAll('.foto')];
    const visor = document.getElementById('visor');
    const img = document.getElementById('visorImg');
    const pie = document.getElementById('visorPie');
    let actual = 0;
    function mostrar(i) {
        actual = (i + fotos.length) % fotos.length;
        const origen = fotos[actual].querySelector('img');
        img.src = origen.src;
        img.alt = origen.alt;
        pie.textContent = fotos[actual].querySelector('span').textContent;
    }
    const cerrar = () => { visor.hidden = true; fotos[actual].focus(); };
    fotos.forEach((f, i) => f.addEventListener('click', () => { mostrar(i); visor.hidden = false; }));
    document.getElementById('visorCerrar').addEventListener('click', cerrar);
    document.getElementById('visorPrev').addEventListener('click', () => mostrar(actual - 1));
    document.getElementById('visorNext').addEventListener('click', () => mostrar(actual + 1));
    visor.addEventListener('click', e => { if (e.target === visor) cerrar(); });
    document.addEventListener('keydown', e => {
        if (visor.hidden) return;
        if (e.key === 'Escape') cerrar();
        if (e.key === 'ArrowLeft') mostrar(actual - 1);
        if (e.key === 'ArrowRight') mostrar(actual + 1);
    });
}

iniciarMenu();
iniciarCotizador();
iniciarFormulario();
iniciarGaleria();
