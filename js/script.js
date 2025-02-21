const app = document.getElementById('app');

/* banco de dados existente para exemplo da aplicação */
const users= [
    {
        email:'test@test.com',
        phone: '91123456789',
        ref: 1,
        refBy: null
    },
    {
        email:'taste@taste.com',
        phone: '91987654321',
        ref: 2,
        refBy: 1
    },
    {
        email: 'seila@naosei.com',
        phone: '919568239874',
        ref: 3,
        refBy: 2
    }

]

/* salva o novo usuário no banco de dados */

const saveUser = (userData) => {
    const newUser ={
        ...userData,
        ref: Math.round(Math.random()*1000 + 4),
        refBy: 1 /* não tenho habilidades o suficiente para manipular como um número dinâmico ainda, portanto todos os usuários vão ser referenciados pelo usuário 1 */
    }

    users.push(newUser);
    console.log(users);
    return newUser;
}

/* Pega o usuário cadastrado que tem o email digitado, se existir*/

const getUserByEmail = (userData) => {
    return users.find((user) =>{
        return user.email === userData.email;
    });
}

/* conta o total de inscritos */

const getTotalSubscribers = (userData) =>{
    const subs = users.filter((user) =>{
        user.refBy === userData.ref;
    }) 
    return subs.length;
}

/* mostra o convite ao invés do formulário */

const showInvite = (userData) => {
    app.innerHTML = `
            <div class="link-container">
                 <h3>Inscrição confirmada! <img src="src/assets/badge-check.svg" alt="bagde check icon"></h3>

                <p>
                Convide mais pessoas e concorra a prêmios! <br/>
                Compartilhe o link e acompanhe as inscrições:
                </p>

                <div class="link-display">
                    <label for="link"><img src="src/assets/link.svg" alt="Link icon"></label>
                    <input type="text" name="link" id="link" value="https://evento.com?${userData.ref}" disabled>
                    <button id="copy">Copiar <img src="src/assets/copy.svg" alt="copy icon"> </button>
                </div>
            </div>

            <div class="count-subscriptions">
                <h4>${getTotalSubscribers(userData)}</h4>
                <p>Inscrições feitas</p>
            </div>`;
}

/* função que será chamada ao submeter o formulário */

const formAction =  () => {
    const form = document.getElementById("form");
    form.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form)
        const userData = {
            email: formData.get('email'),
            phone: formData.get('phone')
        }

        const user = getUserByEmail(userData);
        if(user){
            /* usuario existe */
            showInvite(user)
        } else{
            /* criar novo usuario */
            const newUser = saveUser(userData);
            showInvite(newUser);
        }
    }
}

/* atualiza imagem */

/* const updateImageLinks = () => {
    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute("src"); 
      if (src && !src.startsWith("http")) {  
        img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
      }
    });
}; */

/* coloca o  fomulário ao iniciar a aplicação */

const startApp = () => {
    const content = `
                <form id="form" >
                    <div class="input-field" >
                        <label for="email">
                         <img src="src/assets/mail.svg" alt="Email icon">
                        </label>
                        <input type="email" name="email" id="email" placeholder="E-mail">
                    </div>

                    <div class="input-field">
                        <label for="phone">
                            <img src="src/assets/phone.svg" alt="Phone icon">
                        </label>
                        <input type="tel" name="phone" id="phone" placeholder="Telefone">
                    </div>

                <button>Confirmar <img src="src/assets/arrow-right.svg" alt="Arrow right"> </button>
                </form>`;

    app.innerHTML = content;
    app.setAttribute('class', 'page-start');
    formAction();
};

startApp();