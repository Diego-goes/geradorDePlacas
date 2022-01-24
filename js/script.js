// - - - - - - Criação do localStorage do navegador  - - - - - - //
if (localStorage.idPlaca == null) {
    let placasFav = [];
    let historico = [];
    localStorage.setItem(`idPlaca`, `0`);
    localStorage.setItem(`placasFav`, JSON.stringify(placasFav));
    localStorage.setItem(`historico`, JSON.stringify(historico));
}
// - - - - - - Criação da classe de todas os objetos placa.  - - - - - - //
class Placa {
    constructor(numero, id, cor, srcFav) {
        this.numero = numero;
        this.id = id;
        this.cor = cor;
        this.srcFav = srcFav;
    }
}
// - - - 1º Opção de criação, apenas as placas particulares ( Pretas ) - - - //
function criarGerar1() {
    let qtdPlacas = document.getElementById(`qtdPlacas`).value;
    let idPlaca = Number(localStorage.idPlaca);
    let todasPlacas = [];
    let historico = JSON.parse(localStorage.historico);
    for (let i = 0; i < qtdPlacas; i++) {
        let placa = new Placa(placaAleatoria(), idPlaca, `black`, `salvar`);
        if (localStorage.historico.length < 3) {
            idPlaca += 1;
            todasPlacas.push(placa);
            historico.push(placa);
            localStorage.setItem(`historico`, JSON.stringify(historico));
        } else {
            for (let i in historico) {
                if (placa.numero !== historico[i].numero) {
                    idPlaca += 1;
                    todasPlacas.push(placa);
                    historico.push(placa);
                    localStorage.setItem(`historico`, JSON.stringify(historico));
                    break;
                } else {
                    //Teste para caso todas as placas possiveis fossem geradas.
                    //historico.length = (4.56e8 + 2);
                    if (historico.length == (4.56e8 + 2)) {
                        let resposta = window.prompt(`Todas as combinações possíveis foram geradas, deseja reiniciar o histórico? | As placas favoritas ainda estarão salvas!`);
                        if (resposta.toLocaleLowerCase().startsWith(`y`) || resposta.toLocaleLowerCase().startsWith(`s`)) {
                            historico = [];
                            localStorage.setItem(`historico`, JSON.stringify(historico));
                        }
                    }
                    i--;
                }
            }
        }

    }
    localStorage.setItem(`idPlaca`, `${idPlaca}`);
    exibirPlacas('sectionPlacasGerar', todasPlacas, "visible", "salvar", "favoritar", "img_fav");
}
// - - - - Exibe as placas salvas em um conjunto em uma section específica - - - - //
function exibirPlacas(sectionId, todasPlacas, visibility, src, funcao, classe) {
    let section = document.getElementById(`${sectionId}`);
    section.innerHTML = ``;
    for (let i in todasPlacas) {
        let newDiv = document.createElement(`div`);
        newDiv.setAttribute(`id`, `placa_${todasPlacas[i].id}`);
        newDiv.setAttribute(`class`, `placa`);
        newDiv.setAttribute(`style`, `color:${todasPlacas[i].cor}`);
        newDiv.innerHTML = `
            <div class="topPlaca">
                <img src="images/placaMercosul/mercosul-logo.png" class="logo-mercosul" alt="">
                <div class="pais">
                    <p>BRASIL</p>
                </div>
                <img src="images/placaMercosul/banderia-brasil.jpg"  class="logo-brasil" alt="">
            </div>
            <div class="bottonPlaca">
                <div>
                    <p class="nacionalidade" style = "color: black">BR</p>
                </div>
                <div class="numeracao">
                    <p>${todasPlacas[i].numero}</p>
                </div>
            </div>
            <div id="favoritar" style = "visibility: ${visibility}">
                <label onclick = "${funcao}('${todasPlacas[i].id}')" >
                    <img id = 'img_${todasPlacas[i].id}' src="images/icons/${src}.png" class = "${classe}">
                </label>
            </div>
        `;
        section.appendChild(newDiv);
    }
}
// - - - - - - Mostra os favoritos assim que a página é carregada  - - - - - - //
function carregarFav() {
    let placasFav = JSON.parse(localStorage.placasFav);
    exibirPlacas("placasFavoritas", placasFav, "hidden", "salvar", "img_fav");
}
// - Adiciona a placa selecionada á um array de favoritos, e alterna os ícones de interação. - //
function favoritar(idPlaca) {
    let historico = JSON.parse(localStorage.historico);
    let placasFav = JSON.parse(localStorage.placasFav);
    let img = document.getElementById(`img_${idPlaca}`)
    for (let i in historico) {
        if (historico[i].id == idPlaca) {
            if (historico[i].srcFav == `salvar`) {
                historico[i].srcFav = `salvo`;
                placasFav.push(historico[i]);
            } else {
                historico[i].srcFav = `salvar`;
                for (let i in placasFav) {
                    if (placasFav[i].id == idPlaca) {
                        placasFav.splice(i, 1);
                    }
                }
            }
            var src = historico[i].srcFav;
        }
    }
    img.setAttribute(`src`, `images/icons/${src}.png`);
    localStorage.setItem(`placasFav`, JSON.stringify(placasFav));
    localStorage.setItem(`historico`, JSON.stringify(historico));
}
// - - - Habilita a edição dos itens favoritados. - - - //
function editarFav() {
    let limparFav = document.getElementById(`limparFav`);
    let voltarFav = document.getElementById(`voltarFav`);
    let concluirEdicao = document.getElementById(`concluirEdicao`);
    let editarFav = document.getElementById(`editarFav`);
    let placasFav = JSON.parse(localStorage.placasFav);
    voltarFav.style.display = `none`;
    editarFav.style.display = `none`;
    limparFav.style.display = `inline-block`;
    concluirEdicao.style.display = `inline-block`;
    exibirPlacas("placasFavoritas", placasFav, "visible", "excluir", "removerFav", "img_excluir");

}
// - - - - - - Opção de excluir qualquer placa dos favs.  - - - - - - //
function removerFav(idPlaca) {
    let placasFav = JSON.parse(localStorage.placasFav);
    for (let i in placasFav) {
        if (placasFav[i].id == idPlaca) {
            placasFav.splice(i, 1);
            localStorage.setItem(`placasFav`, JSON.stringify(placasFav));
        }
    }
    exibirPlacas("placasFavoritas", placasFav, "visible", "excluir", "removerFav", "img_excluir");
}
// - - - - - - Opção de voltar á exibição normal dos favs.  - - - - - - //
function concluirEdicao() {
    let limparFav = document.getElementById(`limparFav`);
    let voltarFav = document.getElementById(`voltarFav`);
    let concluirEdicao = document.getElementById(`concluirEdicao`);
    let editarFav = document.getElementById(`editarFav`);
    let placasFav = JSON.parse(localStorage.placasFav);
    voltarFav.style.display = `inline-block`;
    editarFav.style.display = `inline-block`;
    limparFav.style.display = `none`;
    concluirEdicao.style.display = `none`;
    exibirPlacas("placasFavoritas", placasFav, "hidden", "salvar", "favoritar", "img_salvar");
}
// - - - - - - Opção de excluir todas as placas dos favs.  - - - - - - //
function limparFav() {
    let placasFav = JSON.parse(localStorage.placasFav);
    let resposta = window.prompt(`Deseja mesmo limpar os seus favoritos?`);
    if (resposta.toUpperCase().startsWith(`Y`) || resposta.toUpperCase().startsWith(`S`)) {
        placasFav = [];
        localStorage.setItem(`placasFav`, JSON.stringify(placasFav));
        concluirEdicao();
    }
}
// - - - - - - Altera o formulário conforme a categoria. - - - - - - //
function mudarFormulario() {
    let divGerar1 = document.getElementById(`divGerar1`);
    let divGerar2 = document.getElementById(`divGerar2`)
    let placaP = document.getElementsByName(`radioGerar1`);
    let cabecalhoHr = document.getElementById(`cabecalhoHr`);
    let cabecalhoP = document.getElementById(`cabecalhoP`)
    if (placaP[0].checked) {
        cabecalhoP.style.display = `none`;
        cabecalhoHr.style.display = `none`;
        divGerar2.style.visibility = `visible`
        divGerar2.style.height = `280px`;
        divGerar2.style.padding = `20px`;
        divGerar1.style.borderBottomLeftRadius = `0px`;
        divGerar1.style.borderBottomRightRadius = `0px`;
    } else if (placaP[1].checked) {
        // - - - - Desmarcar todos os inputs da Cat2 - - - - 
        let checkboxCat2 = document.getElementsByName("ckCategoria1");
        let inputPossiveis = [`qtdPretas`, `qtdVermelhas`, `qtdAzuis`, `qtdDouradas`, `qtdVerdes`, `qtdCinzas`];
        for (let i = 0; i < checkboxCat2.length; i++) {
            inputMudanca = document.getElementById(inputPossiveis[i]);
            inputMudanca.style.visibility = `hidden`;
            checkboxCat2[i].checked = 0;
        }
        // - - - - Personalizar a div de categorias - - - - 
        divGerar1.style.borderBottomRightRadius = `0px`;
        divGerar1.style.borderBottomLeftRadius = `25px`;
        cabecalhoP.style.display = `block`;
        cabecalhoHr.style.display = `block`;
        divGerar2.style.visibility = `hidden`;
        divGerar2.style.height = `0px`;
        divGerar2.style.padding = `0px`;
    }
}
// - - - - - - Exibe ou esconde os inputs da categoria selecionada. - - - - - - //
function alternarInputCat2() {
    let checkboxCat2 = document.getElementsByName("ckCategoria1");
    let inputMudanca;
    for (let i = 0; i < checkboxCat2.length; i++) {
        inputMudanca = document.getElementById(pegarIdInput(i));
        if (checkboxCat2[i].checked) {
            inputMudanca.style.visibility = `visible`;
        } else {
            inputMudanca.style.visibility = `hidden`;
        }
    }
    // - - - - - - Pega o input correspondente - - - - - - //
    function pegarIdInput(a) {
        let inputPossiveis = [`qtdPretas`, `qtdVermelhas`, `qtdAzuis`, `qtdDouradas`, `qtdVerdes`, `qtdCinzas`];
        let inputMudanca;
        for (let i in inputPossiveis) {
            if (i == a) {
                inputMudanca = inputPossiveis[i];
            }
        }
        return inputMudanca;
    }
}
// - - - - - - Gera uma placa de caracteres aleatórios. - - - - - - //
function placaAleatoria() {
    let alfabeto = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`];
    let placaModelo = [`a`, `b`, `c`, 1, `d`, 2, 3];
    let numPlaca = [];
    function isString(inputText) {
        if (inputText * 0 == 0) {
            return false;
        } else {
            return true;
        }
    }
    for (let i in placaModelo) {
        if (isString(placaModelo[i])) {
            numPlaca.push(alfabeto[gerarNumAleatorio(1, 26)]);
        } else {
            numPlaca.push(gerarNumAleatorio(0, 9));
        }
    }
    numPlaca = numPlaca.join(`-`);
    numPlaca = numPlaca.replaceAll(`-`, ``);
    return numPlaca = numPlaca.toUpperCase();
}

// - - - - Gera um número aleatório em um determinado intervalo - - - - //
function gerarNumAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
// - - - Salva os valores dos inputs nas categorias personalizadas. - - - //
function salvarTotalPlacas() {
    // - - - - Salvar valores dos inputs - - - - 
    let checkboxCat2 = document.getElementsByName("ckCategoria1");
    let inputPossiveis = [`qtdPretas`, `qtdVermelhas`, `qtdAzuis`, `qtdDouradas`, `qtdVerdes`, `qtdCinzas`];
    let inputsValues = [];
    for (let i = 0; i < checkboxCat2.length; i++) {
        let inputValue = document.getElementById(inputPossiveis[i]).value;
        inputsValues[i] = inputValue;
    }
    return inputsValues;
}
// - - - - - - Mostra o total de placas a serem geradas. - - - - - - //
function exibirTotalPlacas() {
    // - - - - Somar e exibir valores dos inputs - - - - 
    let qtdTotal = 0;
    let inputsValues = salvarTotalPlacas();
    for (let i in inputsValues) {
        qtdTotal += Number(inputsValues[i]);
    }
    let pTotalCat4 = document.getElementById(`pTotalCat4`);
    pTotalCat4.innerHTML = `${qtdTotal} <small>Placas</small>`;
}
// - - - - - - Cria as placas personalizadas. - - - - - - //
function criarCat4() {
    let inputsValues = salvarTotalPlacas();
    let historico = JSON.parse(localStorage.historico);
    let idPlaca = JSON.parse(localStorage.idPlaca);
    let todasPlacas = [];

    // - - - - - - Ler qtd de placas de cada categoria - - - - - -
    for (let i in inputsValues) {
        let cores = [`#000000`, `#ca0000`, `#004dca`, `#ffd000`, `#3cad19`, `#727272`];
        let qtd = inputsValues[i];
        // - - - - - - Qtd == Nº de placas á criar - - - - - -
        for (let j = 0; j < qtd; j++) {
            var placa = new Placa(placaAleatoria(), idPlaca, cores[i], `salvar`);
            if (localStorage.historico.length < 3) {
                idPlaca += 1;
                todasPlacas.push(placa);
                historico.push(placa);
                localStorage.setItem(`historico`, JSON.stringify(historico));
            } else {
                // - - - - - - Validar placa - - - - - -
                for (let k in historico) {
                    if (placa.numero !== historico[k].numero) {
                        idPlaca += 1;
                        todasPlacas.push(placa);
                        historico.push(placa);
                        localStorage.setItem(`historico`, JSON.stringify(historico));
                        break;
                    } else {
                        alert(`Placa repetida!`);
                        //historico.length = (4.56e8 + 2);
                        if (historico.length == (4.56e8 + 2)) {
                            let resposta = window.prompt(`Todas as combinações possíveis foram geradas, deseja reiniciar o histórico? | As placas favoritas ainda estarão salvas!`);
                            if (resposta.toLocaleLowerCase().startsWith(`y`) || resposta.toLocaleLowerCase().startsWith(`s`)) {
                                historico = [];
                                localStorage.setItem(`historico`, JSON.stringify(historico));
                            }
                        }
                        i--;
                    }
                }
            }
        }
    }
    localStorage.setItem(`idPlaca`, `${idPlaca}`);
    exibirPlacas('sectionPlacasGerar', todasPlacas, "visible", "salvar", "favoritar", "img_fav");
}
// - - - - - - Organiza a página ao carregar - - - - - - //
function loadGerar() {
    let opcaoRadio = document.getElementById(`radioNao`);
    opcaoRadio.checked = true;
    let inputPossiveis = [`qtdPretas`, `qtdVermelhas`, `qtdAzuis`, `qtdDouradas`, `qtdVerdes`, `qtdCinzas`];
    let checkboxCat2 = document.getElementsByName("ckCategoria1");
    for (let i = 0; i < checkboxCat2.length; i++) {
        checkboxCat2[i].checked = false;
        let inputs = document.getElementById(inputPossiveis[i]);
        inputs.value = ``;
    }

}
// - - - - - - Limpa a exibição de placas geradas. - - - - - - //
function limparLista(idElemento) {
 let section = document.getElementById(idElemento);
 section.innerHTML = ``;
}