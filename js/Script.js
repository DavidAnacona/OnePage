(function () {
    //Objeto con las propiedades del efecto lightbox
    var propLightbox = {

        imgContainer: document.getElementsByClassName('lightbox'),
        imagen: null,
        imagenSrc: null,
        cuerpoDom: document.getElementsByTagName('body')[0],
        lightbox_container: null,
        modal: null,
        cerrarModal: null,
        animacion: 'fade'
    }

    //objeto con los metodos del efecto lightbox
    var metLightbox = {

        inicio: function () {
            for (var i = 0; i < propLightbox.imgContainer.length; i++) {
                propLightbox.imgContainer[i].addEventListener('click', metLightbox.capturaImagen);
            }
        },

        capturaImagen: function () {

            propLightbox.imagen = this;
            metLightbox.lightbox(propLightbox.imagen);
        },

        lightbox: function (imagen) {

            propLightbox.imagenSrc = window.getComputedStyle(imagen, null).backgroundImage.slice(5, -2);
            propLightbox.cuerpoDom.appendChild(document.createElement('DIV')).setAttribute('id', 'lightbox_container');
            propLightbox.lightbox_container = document.getElementById('lightbox_container');
            propLightbox.lightbox_container.style.width = '100%';
            propLightbox.lightbox_container.style.height = '100%';
            propLightbox.lightbox_container.style.position = 'fixed';
            propLightbox.lightbox_container.style.zIndex = '1000';
            propLightbox.lightbox_container.style.background = 'rgba(0,0,0,0.8)';
            propLightbox.lightbox_container.style.top = '0';
            propLightbox.lightbox_container.style.left = '0';

            propLightbox.lightbox_container.appendChild(document.createElement('DIV')).setAttribute('id', 'modal');
            propLightbox.modal = document.getElementById('modal');
            propLightbox.modal.style.height = '100%';
            propLightbox.modal.appendChild(document.createElement('IMG')).setAttribute('src', propLightbox.imagenSrc);
            propLightbox.modal.getElementsByTagName('img')[0].setAttribute('class', 'imagen-modal');

            if (propLightbox.animacion == 'fade') {
                document.getElementsByClassName('imagen-modal')[0].style.opacity = 0;

                setTimeout(function () {
                    document.getElementsByClassName('imagen-modal')[0].style.opacity = 1;
                }, 100);
            }

            propLightbox.modal.innerHTML += '<i id="cerrar_modal" class="fa fa-times" aria-hidden="true"></i>';

            propLightbox.cerrarModal = document.getElementById('cerrar_modal');
            propLightbox.cerrarModal.addEventListener('click', metLightbox.cerrarModal);
        },

        cerrarModal: function () {
            propLightbox.cuerpoDom.removeChild(propLightbox.lightbox_container);
        }

    }

    metLightbox.inicio();

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //PROPIEDADES SLIDER
    var propSlider = {
        slider: document.getElementById('slider'),
        primerSlide: null
    }


    //METODOS SLIDER

    var metSlider = {

        inicio: function () {

            setInterval(metSlider.moverSlide, 3000);
        },
        moverSlide: function () {
            propSlider.slider.style.transition = 'all 1s ease';
            propSlider.slider.style.marginLeft = '-100%';

            setTimeout(function () {
                propSlider.primerSlide = propSlider.slider.firstElementChild;
                propSlider.slider.appendChild(propSlider.primerSlide);
                propSlider.slider.style.transition = 'unset';
                propSlider.slider.style.marginLeft = 0;
            }, 1000);
        }
    }
    metSlider.inicio();

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    //OBJETO CON LAS PROPIEDADES DE TAB
    var propTabs = {

        primer_encabezado: document.getElementById('encabezado_menu').firstElementChild,
        primer_contenido: document.getElementById('contenido_menu').firstElementChild,
        enlaces_encabezado: document.querySelectorAll('#encabezado_menu li a'),
        li_encabezado: document.querySelectorAll('#encabezado_menu li'),
        divs_contenido: document.querySelectorAll('#contenido_menu > div'),
        contenido_activo: null
    }

    //OBEJTO CON LOS METODOS DE TABS
    var metTabs = {

        inicio: function () {
            propTabs.primer_encabezado.className = 'active';
            propTabs.primer_contenido.className = 'active';

            for (var i = 0; i < propTabs.enlaces_encabezado.length; i++) {
                propTabs.enlaces_encabezado[i].addEventListener('click', metTabs.evento);
            }
        },
        evento: function (e) {
            e.preventDefault();
            for (var i = 0; i < propTabs.li_encabezado.length; i++) {
                propTabs.li_encabezado[i].className = '';
            }
            for (var i = 0; i < propTabs.divs_contenido.length; i++) {
                propTabs.divs_contenido[i].className = '';
            }

            this.parentElement.className = 'active';
            propTabs.contenido_activo = this.getAttribute('href');
            document.querySelector(propTabs.contenido_activo).className = 'active';
            document.querySelector(propTabs.contenido_activo).style.opacity = 0;
            setTimeout(function () {
                document.querySelector(propTabs.contenido_activo).style.opacity = 1;
            }, 200);
        }

    }
    metTabs.inicio();
}())


//OBJETO CON PROPIEDADES DE PARALLAX

var propParallax = {

    seccion: document.querySelector('.parallax'),
    recorrido: null,
    limite: null

}

//OBJETO CON METODOS DE PARALLAX

var metParallax = {

    inicio: function () {
        window.addEventListener('scroll', metParallax.scrollParallax);

    },
    scrollParallax: function () {
        propParallax.recorrido = window.pageYOffset;
        propParallax.limite = propParallax.seccion.offsetTop + propParallax.seccion.offsetHeight;

        if (propParallax.recorrido > propParallax.seccion.offsetTop - window.outerHeight && propParallax.recorrido <= propParallax.limite) {

            propParallax.seccion.style.backgroundPositionY = (propParallax.recorrido - propParallax.seccion.offsetTop) / 1.5 + 'px';
        }
        else {
            propParallax.seccion.style.backgroundPositionY = 0;
        }
    }
}
metParallax.inicio();

// Efecto material design 

//Objeto con propiedades de formulario 
var propformulario = {

    formulario: document.formulario_contacto,
    elementos: document.formulario_contacto.elements,
    error: null,
    textoError: null,
    parrafoCreado: null
}

//objeto con los metodos de formulario 

var metformulario = {
    inicio: function () {
        for (var i = 0; i < propformulario.elementos.length; i++) {
            if (propformulario.elementos[i].type == 'text' || propformulario.elementos[i].type == 'email' || propformulario.elementos[i].nodeName.toLowerCase() == 'textarea') {
                propformulario.elementos[i].addEventListener('focus', metformulario.focusInput);
                propformulario.elementos[i].addEventListener('blur', metformulario.blurInput);
            }

        }
        propformulario.formulario.addEventListener('submit', metformulario.validarInputs);
    },
    focusInput: function () {
        this.parentElement.children[1].className = 'label active';
    },
    blurInput: function () {
        if (this.value == '') {
            this.parentElement.children[1].className = 'label';
        }
    },
    validarInputs: function (e) {
        for (var i = 0; i < propformulario.elementos.length; i++) {
            if (propformulario.elementos[i].value == '') {
                e.preventDefault();

                if (propformulario.elementos[i].parentElement.children.length < 3) {

                    propformulario.error = document.createElement('p');
                    propformulario.textoError = document.createTextNode('Por favor llene el campo con tu ' + propformulario.elementos[i].name);
                    propformulario.error.appendChild(propformulario.textoError);
                    propformulario.error.className = 'error';

                    propformulario.elementos[i].parentElement.appendChild(propformulario.error);
                }
            }
            else{
                if(propformulario.elementos[i].parentElement.children.length >= 3){

                    propformulario.error = propformulario.elementos[i].parentElement.getElementsByTagName('p')[0];
                    propformulario.elementos[i].parentElement.removeChild(propformulario.error);
                }
            }
        }
    }

}
metformulario.inicio();

// Objeto con propiedades de efecto scroll
var propScroll = {

	posicion: window.pageYOffset,
	scroll_suave: document.getElementsByClassName('scroll-suave'),
	volver_arriba: document.getElementsByClassName('volver-arriba'),
	destino: null,
	seccion_distancia: null,
	intervalo: null

}


// Objeto con métodos de efecto scroll
var metScroll = {

	inicio: function () {
		
		for (var i = 0; i < propScroll.scroll_suave.length; i++) {
			propScroll.scroll_suave[i].addEventListener('click', metScroll.moverse);
		}

		for (var i = 0; i < propScroll.volver_arriba.length; i++) {
			propScroll.volver_arriba[i].addEventListener('click', metScroll.subir);
		}

	},


	moverse: function (e) {
		e.preventDefault();
		clearInterval(propScroll.intervalo);
		propScroll.destino = this.getAttribute('href');
		propScroll.seccion_distancia = document.querySelector(propScroll.destino).offsetTop - 94;

		propScroll.posicion = window.pageYOffset;
		propScroll.intervalo = setInterval(function () {

			if ( propScroll.posicion < propScroll.seccion_distancia) {

				propScroll.posicion += 30;

				if (propScroll.posicion >= propScroll.seccion_distancia) {
					clearInterval(propScroll.intervalo);
				}

			} else{

				propScroll.posicion -= 30;

				if (propScroll.posicion <= propScroll.seccion_distancia) {
					clearInterval(propScroll.intervalo);
				}

			}
			
			window.scrollTo(0, propScroll.posicion);

		}, 15);
	},

	subir: function (e) {
		e.preventDefault();
		clearInterval(propScroll.intervalo);
		propScroll.posicion = window.pageYOffset;
		propScroll.intervalo = setInterval(function(){

			if ( propScroll.posicion > 0 ) {

				propScroll.posicion -= 30;

				if (propScroll.posicion <= 0) {
					clearInterval(propScroll.intervalo);
				}

			} else{
				return;
			}

			window.scrollTo(0, propScroll.posicion);

		}, 15);

	}

	
}

metScroll.inicio();

//----------------------------------------------------------------------------------------

//Menu movil 

// Propiedades de menu movil

var propMenu = {

	burger_menu: document.getElementById('burger_menu'),
	slideMenu: document.getElementById('slideMenu'),
	menu_activo: false,
	elem_menu: document.querySelectorAll('#slideMenu .menu-principal a')

}

// Métodos de menu movil

var metMenu = {
	
	inicio: function () {
		
		propMenu.burger_menu.addEventListener('click', metMenu.toggleMenu);

		for (var i = 0; i < propMenu.elem_menu.length; i++) {
			propMenu.elem_menu[i].addEventListener('click', metMenu.ocultarMenu);
		}

	},

	toggleMenu: function () {
		if ( propMenu.menu_activo == false ) {

			propMenu.menu_activo = true;
			propMenu.slideMenu.className = propMenu.slideMenu.className + ' active';

		} else{

			propMenu.menu_activo = false;
			propMenu.slideMenu.className = propMenu.slideMenu.className.replace('active', '');

		}
	},

	ocultarMenu: function () {
		propMenu.menu_activo = false;
		propMenu.slideMenu.className = propMenu.slideMenu.className.replace('active', '');
	}

}

metMenu.inicio();
