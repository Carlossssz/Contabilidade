let adicionar = document.querySelector("#adicionar");
let mes = "";
let localMes = []

//Adiciona um id para cada "valor" dentro do localStorageMes.valor;
function adicionarId(){
    let listaDeMes = localStorage.getItem("localStorageMes");
    listaDeMes = JSON.parse(listaDeMes);

    if(listaDeMes !== null){
        id = 0;
        listaDeMes.forEach(function(mesAtual){
            let valorAtual = mesAtual.valor;
            if(valorAtual !== undefined){
                valorAtual.forEach(function(trValor){
                    trValor.id = "id" + id;
                    id = id + 1;
                })  
            }   
        })
        id = 0;
    }
    
    let listaFormatada = JSON.stringify(listaDeMes);
    localStorage.setItem("localStorageMes", listaFormatada)
}

//Abre a janela de diálogo do Mês
adicionar.addEventListener("click", function(){
    let adicionarMes = document.querySelector("#adicionarMes");
    seletorMes.value = "";

    //Animação///////////////////////////////////////////
    adicionarMes.style.display = "flex";
    adicionarMes.classList.add("animaMesReverse")
    setTimeout(()=> {
        adicionarMes.classList.remove("animaMesReverse");
    }, 500);
});

//Função para organizar os itens:
function ordem(lista){
    let arrayLength = lista.length; //Pega a quantia de itens dentro do array
    let houveTroca;     //variável para verificar se ouve uma troca de lugar entre os valores

    do {
        houveTroca = false;

        for(let i = 0; i < arrayLength -1; i++){
            let elemento1 = parseInt(lista[i].data); //aqui objeto[objetoParaArray[i]] passa o valor de objetoParaArray na posição (i) como parâmetro para objeto, objeto["janeiro"].data.
            let elemento2 = parseInt(lista[i + 1].data); //aqui [i + 1], é para pegar o próximo elemento em relação ao elemento atual representado por (i);
            // Se o elemento atual é maior que o próximo, troca-os de lugar

            if(elemento1 > elemento2){ 
                let valorTemporario = lista[i];
                lista[i] = lista[i + 1];
                lista[i + 1] = valorTemporario;
                
                houveTroca = true; //retorna "true", para o while executar o código novamente.
            }
        }
    }while(houveTroca);

    // Retorna o objeto ordenado
    return lista;
}


//Transforma o Mes de decimal para seu nome correspondente;
const meses = {
    '01': "Janeiro",
    '02': "Fevereiro",
    '03': "Março",
    '04': "Abril",
    '05': "Maio",
    '06': "Junho",
    '07': "Julho",
    '08': "Agosto",
    '09': "Setembro",
    '10': "Outubro",
    '11': "Novembro",
    '12': "Dezembro"
  };

/**Dessa forma, você usa o valor mesNumero como uma chave para acessar o nome do mês correspondente no objeto meses. Isso reduz a necessidade de vários blocos if e torna o código mais legível e fácil de manter. */

//SELECIONA O MES
let seletorMes = document.querySelector("#seletorMes");

seletorMes.addEventListener("input", function(){
    let adicionarMes = document.querySelector("#adicionarMes");
    mesComAno = seletorMes.value; //Pega o valor total do mês com o ano, escolhido.
    
    let ano = mesComAno.slice(0, 4) //Pega o ano selecionado
    let mesNumeroUnico = mesComAno.slice(-2); //captura o valor apenas do mês escolhido.
    let mesEscolhido = meses[mesNumeroUnico]; //usa o valor mesNumero como uma chave para acessar o nome do mês correspondente no objeto meses

    localMes.push ({
        mes: mesEscolhido,
        data: mesNumeroUnico,
        ano: ano
    })
    mesOrdenado = ordem(localMes); //ordena os meses
    mesString = JSON.stringify(mesOrdenado) //Transforma o array/objeto em string
    
    let pegarMesesLocalStorage = JSON.parse(localStorage.getItem("localStorageMes")) || []; //pegarMesesLocalStorage vai receber [] caso localStorageMes não exista no localStorage;
    let mesesConcatenados = [...pegarMesesLocalStorage, ...mesOrdenado]
    mesesConcatenados = ordem(mesesConcatenados)
    mesConcat = JSON.stringify(mesesConcatenados);

    if(pegarMesesLocalStorage === "" || pegarMesesLocalStorage === null){
        localStorage.setItem("localStorageMes", mesString);
    }else{
        localStorage.setItem("localStorageMes", mesConcat);
    }
    
    //Animação remove a janela de dialogo para dicionar Mes/////////////////////////////////////
    adicionarMes.classList.add("animaMes");
    setTimeout(()=>{
        adicionarMes.style.display = "none";
        adicionarMes.classList.remove("animaMes");
    }, 500);

    setTimeout(()=>{
        location.reload();//Recarrega a página
    }, 550);
})

//Função para excluir o mes;
function excluirMes(mes){
    let mesLS = localStorage.getItem("localStorageMes");
    mesLS = JSON.parse(mesLS);
    mesLS = mesLS.filter(objeto => objeto.data !== mes);
    let mesString = JSON.stringify(mesLS);

    let cont = document.createElement("div");
    cont.className = "blocoExcluir";
    cont.innerHTML = `
        <h2>Excluir o mês de ${meses[mes]}?</h2>
        <div>
            <button class="excluirSim">Sim</button>
            <button class="excluirNao">Não</button>
        </div>
    `
    document.body.appendChild(cont);
    
    let btnSim = document.querySelector(".excluirSim");
    let btnNao = document.querySelector(".excluirNao");

    btnSim.addEventListener("click", function(){
        localStorage.setItem("localStorageMes", mesString);
        location.reload();
    })

    btnNao.addEventListener("click", function(){
        document.body.removeChild(cont);
    })
}


//Fechar Janela de AdicionarValor;
let fecharValor = document.querySelector("#fecharValor");
fecharValor.addEventListener("click", function(){
    let blocoValor = document.querySelector("#novoValor");
    blocoValor.style.display = "none";
})

//Função para adicionar um novo valor ao objeto; 
function adicionarValor(mes){
    //Seleciona o mês
    let mesLS = localStorage.getItem("localStorageMes");
    mesLS = JSON.parse(mesLS); //Trasforma o mes de string para um array
    console.log(mesLS);

    let mesEscolhido = mesLS.filter(objeto => objeto.mes === mes); //pega o mes exato em que clicamos, que está no array tornando-o um array de um elemento só;

    //pegar o valor do HTML;
    let blocoValor = document.querySelector("#novoValor");
    blocoValor.style.display = "flex";

    let dataAtual = new Date();

    let salvarValor = document.querySelector("#salvar");
    salvarValor.addEventListener("click", function(){
        let valorInput = document.querySelector("#valor").value;
        let valor = parseFloat(valorInput);
        let descricao = document.querySelector("#descricao"). value;
        let listaDeValores;
        let dataMes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
        dataMes = meses[dataMes];
        dataMes = dataMes.slice(0, 3)
        let data = `${dataAtual.getDate()} - ${dataMes}`;

        if(valor !== "" &&  !isNaN(valor)  && descricao !== ""){
            let estilo;
            if(valor > 0){
                estilo = "valorColorGreen";
            }else if(valor < 0){
                estilo = "valorColorRed";
            }

            listaDeValores = 
                {"descricao": descricao,
                "valor": valor,
                "data": data,
                "estilo": estilo
            }   
           
            //Passar o valor de listaDeValores para o localStorage:
            if(mesEscolhido[0].valor === undefined){
                mesEscolhido[0].valor = [];  //passamos o valor para o mes exato em que clicamos tambés já está sendo passado para mesLS;
                mesEscolhido[0].valor.push(listaDeValores)
            }else{
                mesEscolhido[0].valor.push(listaDeValores)
            }
            
            let mesLSNoBug = JSON.stringify(mesLS)
            localStorage.setItem("localStorageMes", mesLSNoBug);

            blocoValor.style.display = "none";
            location.reload();

        }else if(valorInput === "" || descricao === ""){
            alert("Preencha todos os campos para inserir um novo valor!");
        }else if(isNaN(valor)){
            alert("A propriedade valor deve conter apenas números!");
        }
    })
}

//Passar o bloco de contabilidade para o HTML
function container(){
    let listaDeMeses = localStorage.getItem("localStorageMes") //Pega a lista de meses do localStorage;
    listaDeMeses = JSON.parse(listaDeMeses); //Transforma a lista de uma string para um array novamente;

    let planilha = document.querySelector("#planilha");

    if(listaDeMeses !== null){
        listaDeMeses.forEach(function(mes){
            let conta = document.createElement("div");
            conta.classList.add("planilhaBloco");
            conta.id = mes.mes //adiciona um id com o nome do mes que possui
            conta.innerHTML =
            `<h2>${mes.mes} - ${mes.ano}</h2>
            <table border="1">
                <thead>
                    <th>Descrição</th>
                    <th>valor</th>
                    <th>!</th>
                    <th>data</th>
                    <th class="excluir"  onclick="excluirMes('${mes.data}')">Excluir</th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="5" class="adicionarValor" onclick="adicionarValor('${mes.mes}')">Adicionar valor</td>
                    </tr>
                    <tr>
                        <td colspan="1">Saldo Total:</td>
                        <td colspan="4" id="total${mes.data}"></td>
                    </tr>
                    
                </tbody>
            </table>`
            planilha.appendChild(conta);
            adicionarId();
        })
    }
}
container();

let listaArray = JSON.parse(localStorage.getItem("localStorageMes"));

//coloca os valores na tela;
function valores(){
    let listaDeMeses = localStorage.getItem("localStorageMes");
    listaDeMeses = JSON.parse(listaDeMeses);

    if(listaDeMeses !== null){
        listaDeMeses.forEach(function(mes){
            let valores = mes.valor;
            let somaDosValores = 0;

            if(valores !== undefined){
                valores.forEach(function(valorAtual){
                    let mesBloco = document.querySelector(`#${mes.mes} tbody`).firstElementChild;
                    let novoTr = document.createElement("tr");
                    novoTr.id = valorAtual.id
                    novoTr.className = "valoTr"
                    novoTr.dataset.descricao = valorAtual.descricao

                    novoTr.innerHTML = `
                        <td>${valorAtual.descricao}</td>
                        <td Class="${valorAtual.estilo}">R$ ${valorAtual.valor.toFixed(2)}</td>
                        <td class="excluirMini" data-id="${valorAtual.id}">-</td>
                        <td colspan="2" class="data">${valorAtual.data}</td>
                    `
                    
                    if(mesBloco){
                        mesBloco.parentNode.insertBefore(novoTr, mesBloco)
                    }
                })
            }
            somatoria();
        })
    }
}
valores();

//listaArray.findIndex(objeto => objeto.mes === "Fevereiro");
console.log(listaArray)

let fechar = document.querySelector("#fechar");
fechar.addEventListener("click", function(){
    let adicionarMes = document.querySelector("#adicionarMes");

    adicionarMes.classList.add("animaMes");
    setTimeout(()=>{
        adicionarMes.style.display = "none";
        adicionarMes.classList.remove("animaMes");
    }, 500);

})
//Criar a função para excluir o tr do html e excluir do localStorage, depois atualiza a pagina kkk.

function excluirMini(){
    let listaDeMes = localStorage.getItem("localStorageMes");
    listaDeMes = JSON.parse(listaDeMes);

    let minis = document.querySelectorAll(".excluirMini");
    minis.forEach(function(elemento){
        elemento.addEventListener("click", function(){
            let elementoID = elemento.dataset.id;
            let valorExcluir = document.querySelector(`#${elementoID}`);
            let descricao = valorExcluir.dataset.descricao;

            let cont = document.createElement("div");
            cont.className = "blocoExcluir";
            cont.innerHTML = `
                <h2>Excluir "${descricao}"?</h2>
                <div>
                    <button class="excluirSim">Sim</button>
                    <button class="excluirNao">Não</button>
                </div>
            `
            document.body.appendChild(cont);
            
            let btnSim = document.querySelector(".excluirSim");
            let btnNao = document.querySelector(".excluirNao");

            btnSim.addEventListener("click", function(){
                let tbodyPai = valorExcluir.parentNode;
                tbodyPai.removeChild(valorExcluir);
    
                if (listaDeMes !== null){
                    listaDeMes.forEach((mes)=>{
                        let valorLista = mes.valor
                        if(valorLista !== undefined){
                            let objetoId = valorLista.filter(function(objeto){
                                return objeto.id !== elementoID; //pega todos os elementos, menos o que corresponde
                            })
    
                            mes.valor = objetoId;
                        }
                    })
                    let listaMesString = JSON.stringify(listaDeMes);
                    localStorage.setItem("localStorageMes", listaMesString);
                    document.body.removeChild(cont);
                }
                somatoria();
            })
            btnNao.addEventListener("click", function(){
                document.body.removeChild(cont);
            })
        })
    })
}
adicionarId();
excluirMini()

function somatoria(){
    let listaDeMes = localStorage.getItem("localStorageMes");
    listaDeMes = JSON.parse(listaDeMes);

    if (listaDeMes !== null){
        listaDeMes.forEach((mes)=>{
            let valorLista = mes.valor
            let total = 0;
            if(valorLista !== undefined){
                valorLista.forEach(function(elemento){
                    total = total + elemento.valor
                })
            }
            
            let totalEspaco = document.querySelector(`#total${mes.data}`);
            if(total.toString().startsWith("-")){
                let resultado = total.toFixed(2);
                resultado = "-" + resultado.substring(1).padStart(5, "0"); 
                totalEspaco.textContent = `R$${resultado}`;

                if(total > 0){
                    totalEspaco.className = "valorColorGreen"
                }else if(total < 0){
                    totalEspaco.className = "valorColorRed"
                }
            }else{
                totalEspaco.textContent = `R$${total.toFixed(2).padStart(5, 0)}`;
                if(total > 0){
                    totalEspaco.className = "valorColorGreen"
                }else if(total < 0){
                    totalEspaco.className = "valorColorRed"
                }
            }
            //toString para transformar em string,
            // toFixed define a quantia de casa decimais,
            // padStart verifica a se a quantia de caracteres bate com o valor definido, caso não bata, adiciona 0 ao inicio até atingir a quantia desejada
        })
        let listaMesString = JSON.stringify(listaDeMes);
        localStorage.setItem("localStorageMes", listaMesString);
    }
}