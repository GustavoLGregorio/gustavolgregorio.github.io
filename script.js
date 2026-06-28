// navegação ativa
const nav_links = document.getElementById("navegacao_lista").querySelectorAll("a");
const img_perfil = document.getElementById("container_foto").querySelector("img");
const projetos = document.getElementById("projetos").querySelectorAll("article");

observadores();
clicks();

nav_links.forEach((link) => {
	link.addEventListener("click", () => {
		document.querySelector(".active")?.classList.remove("active");
		link.classList.add("active");
	});
});

// animação de entrada na pagina
window.addEventListener("DOMContentLoaded", () => {
	document.body.style.animation = "carregando_conteudo";
	document.body.style.animationDuration = "1200ms";
	document.body.style.animationTimingFunction = "ease-in";

	// Initialize entropy-particles
	if (window.EntropyParticles) {
		const canvas = document.getElementById("entropy-canvas");
		if (canvas) {
			window.particleSystem = new window.EntropyParticles(canvas, {
				particleCount: 80,
				particleColor: "rgba(255, 255, 255, 0.8)",
				speed: 0.5,
				connectionDistance: 120,
				connectionColor: "rgba(255, 255, 255, 0.2)",
			});
		}
	}
});

// Easter egg with die-statement
const btnDie = document.getElementById("btn_die_easteregg");
if (btnDie) {
	btnDie.addEventListener("click", () => {
		if (btnDie.classList.contains("btn-outline-danger")) {
			// Trigger die() on the particle system
			if (window.die && window.particleSystem) {
				try {
					die(window.particleSystem, "Particle system killed by die-statement!");
				} catch (e) {
					console.log(e.message);
				}
				window.particleSystem = null;
				const canvas = document.getElementById("entropy-canvas");
				if (canvas) {
					const ctx = canvas.getContext("2d");
					ctx.clearRect(0, 0, canvas.width, canvas.height);
				}
				btnDie.classList.remove("btn-outline-danger");
				btnDie.classList.add("btn-outline-success");
				btnDie.innerText = "Reviver Particles";
			}
		} else {
			// Revive
			if (window.EntropyParticles) {
				const canvas = document.getElementById("entropy-canvas");
				window.particleSystem = new window.EntropyParticles(canvas, {
					particleCount: 80,
					particleColor: "rgba(255, 255, 255, 0.8)",
					speed: 0.5,
					connectionDistance: 120,
					connectionColor: "rgba(255, 255, 255, 0.2)",
				});
				btnDie.classList.remove("btn-outline-success");
				btnDie.classList.add("btn-outline-danger");
				btnDie.innerText = "Testar die-statement()";
			}
		}
	});
}

// Auto-Theme-JS integration
const btnTheme = document.getElementById("btn_toggle_theme");
if (btnTheme) {
	// Let's rely on basic custom theme toggling for the demo if autoTheme needs special config
	btnTheme.addEventListener("click", () => {
		try {
			if (window.autoThemeToggle) {
				window.autoThemeToggle();
			}
			// Basic toggle based on how the library works
			// Alternatively we can just toggle a class on body to test integration
			if (document.body.classList.contains("theme-light")) {
				document.body.classList.remove("theme-light");
				document.documentElement.style.setProperty('--azul-escuro', 'hsl(250, 80%, 10%)');
				document.documentElement.style.setProperty('--azul-medio', 'hsl(250, 80%, 15%)');
			} else {
				document.body.classList.add("theme-light");
				document.documentElement.style.setProperty('--azul-escuro', 'hsl(250, 20%, 90%)');
				document.documentElement.style.setProperty('--azul-medio', 'hsl(250, 20%, 85%)');
			}
		} catch (e) {
			console.log(e);
		}
	});
}

// dar zoom na foto de perfil
img_perfil.addEventListener("click", () => {
	if (img_perfil.classList.contains("aumentar")) {
		img_perfil.classList.remove("aumentar");
	} else {
		img_perfil.classList.add("aumentar");
	}
});

function observadores() {
	// efeito de scroll (utiliza a API IntersectionObserver)
	if ("IntersectionObserver" in window) {
		// seleciona elementos com a classe ".efeito"
		const elementos = document.querySelectorAll(".efeito");

		// callback do objeto IntersectionObserver()
		const callback = (entradas, observador) => {
			// foreach para cada elemento observado
			entradas.forEach((entrada) => {
				// reconhece a intersecção da viewport com o elemento
				if (entrada.isIntersecting) {
					// vai receber o elemento
					const data_target = entrada.target;
					data_target.classList.add("aparecer");
				} else {
					const data_target = entrada.target;
					data_target.classList.remove("aparecer");
				}
			});
		};

		// opcoes que o IntersectionObserver recebe
		const options = {
			// indica a visualização de intersecção em relação a VP
			root: null,
			// porcentagem onde a intersecção começa a contar
			// antes e depois do elemento
			threshold: 0.2,
		};
		// opção para threshold imediato (porcentagem zero)
		const options2 = {
			root: null,
			threshold: 0,
		};

		// criação do objeto IntersectionObserver
		const meu_observador = new IntersectionObserver(callback, options);
		const meu_observador_imediato = new IntersectionObserver(callback, options2);

		// encontra os elementos e "diz" para o objeto observador
		// "olhar" para cada elemento (roda o código da const "callback")
		elementos.forEach((elemento) => {
			// encontra o elemento (seção) projetos e mostra ela imediatamente
			if (elemento.id == "projetos") {
				meu_observador_imediato.observe(elemento);
			}
			meu_observador.observe(elemento);
		});
		meu_observador_imediato.observe(document.querySelector("#container_h1"));
	}
}

function clicks() {
	projetos.forEach((projeto, index) => {
		projeto.addEventListener("click", () => {
			console.log(index, projeto.id);
			switch (projeto.id) {
				case "projeto_japao":
					window.open("https://gustavo-projeto-japao.vercel.app/");
					break;
				case "lixadora_gregorio":
					window.open("https://gustavo-projeto-japao.vercel.app/");
					break;
				case "snake_game":
					window.open("../pages/snake_game/");
					break;
				case "hangman_game":
					window.open("../pages/jogo_da_forca/");
					break;
			}
		});
	});
}
