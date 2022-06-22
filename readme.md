# Desafio do Frontend Mentor | Página de produto de e-commerce

Este desafio pelo Frontend Mentor com ênfase em JavaScript consistia em simular uma página de produto de uma loja virtual, contendo as principais funcionalidades que uma página de produto teria (como adicionar ou remover produtos de um carrinho de compras). Este é um desafio considerado nível intermediário pela plataforma, ótimo para praticar a manipulação do DOM e usar os principais conceitos de JavaScript.

![Captura de tela do projeto](https://user-images.githubusercontent.com/72027449/175047749-4265a5cd-80a0-4f29-9f21-8e78e21ec4a5.png)

## 📋 Índice

* [Visão geral](#-visão-geral)
    * [Status](#-status)
    * [O desafio](#-o-desafio)
    * [Links](#-acesse-o-projeto)
* [Desenvolvimento](#%EF%B8%8F-desenvolvimento)
    * [Tecnologias utilizadas](#-tecnologias-utilizadas)
    * [Aprendizados e melhorias](#-aprendizados-e-melhorias)
        * [Adicionar ao carrinho](#adicionar-ao-carrinho)
        * [Produto armazenado no localStorage](#produto-armazenado-no-localStorage)
        * [Mensagem de erro](#mensagem-de-erro)
        * [Clique fora](#clique-fora)
        * [Não permitir rolagem em ocasiões específicas](#Não-permitir-rolagem-em-ocasiões-específicas)

## 🔎 Visão geral

### ✅ Status

Projeto: Finalizado.

### 🏁 O desafio

Para a resolução deste desafio, os usuários devem ser capazes de:

* Visualizar exatamente o layout proposto de acordo com o tamanho da janela de exibição (responsividade)
* Visualizar os estados – pairar, clicar ou selecionar – nos elementos interativos para uma usabilidade adequada
* Abrir uma galeria lightbox – uma janela sobreposta a página que expande a imagem clicada – ao clicar na imagem do produto
* Mudar a imagem maior clicando nas imagens pequenas
* Visualizar o carrinho e adicionar ou remover itens do mesmo

### 🔗 Acesse o projeto

* [Link do projeto](https://leo-henrique.github.io/pagina-de-produto/)
* [Desafio no Frontend mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6)

## ⚙️ Desenvolvimento

### 💻 Tecnologias utilizadas

* HTML
* CSS / SASS
* Vanilla JavaScript

### 💡 Aprendizados e melhorias

Apesar de ter sido a primeira vez de ter feito uma funcionalidade de adicionar ao carrinho com JavaScript, todas as outras funcionalidades citadas abaixo são melhorias que não foram requeridas pelo desafio.

#### Adicionar ao carrinho

A lógica para adicionar o produto ao carrinho é bem simples. Ao clicar no botão de adicionar, capturo as informações do produto que já estão na página, como o título, preço e a quantidade selecionada pelo usuário e coloco essas mesmas informações no carrinho de compras, removendo a classe que estiliza o carrinho quando ele está vazio e adicionando uma classe que estiliza para quando ele está cheio.

#### Produto armazenado no localStorage

Assim como as informações do produto na página são adicionadas ao carrinho ao clicar no botão de adicionar, também adiciono-as ao localStorage. Desta forma, ao carregar a página sempre executo uma função que adiciona as informações salvas no localStorage, caso houver, no carrinho de compras.

![Produto sendo armazenado no localStorage](https://user-images.githubusercontent.com/72027449/175071365-ce226f62-84d3-4995-90dc-a965166bba8f.gif)

#### Mensagem de erro

Sempre que o usuário deixa de selecionar uma quantidade do produto ou especifique o número 0 eu exibo uma mensagem de erro que só é oculta ao especificar um número diferente de 0 ou quando o usuário tira o foco do campo de entrada.

![Mensagem de erro sendo exibida quando necessário](https://user-images.githubusercontent.com/72027449/175071522-ed8c1877-5568-4d7a-aff1-73ada7665f8e.gif)

#### Clique fora

Criei uma função no JavaScript que sempre executo para elementos que são abertos com algum evento – como um menu mobile ou menu dropdown –, com o objetivo de fechar este elemento ao clicar fora dele.

A função recebe dois argumentos em sua execução, o primeiro é um array com os elementos que ao serem clicados, não fecharão o elemento aberto. O segundo é a função de callback que fechará o elemento aberto ao clicar em qualquer elemento que não seja os setados no array do primeiro argumento.

```js
clickOutside([cart, btnMinus, unity, btnPlus], closeCart);
```

A função adiciona um atributo do tipo data ao elementos setados e um evento de click ao documento, que sempre verifica se o elemento que estou clicando contém ou não o atributo, fechando se não tiver e não fechando se houver o atributo.

Dessa forma, como mostrado no código acima, o carrinho de compras é fechado ao clicar em qualquer elemento que não seja ele mesmo ou caso o usuário esteja selecionando uma nova quantidade do produto.

![Mostrando como a função de clique fora se comporta](https://user-images.githubusercontent.com/72027449/175071632-ad1bcd0e-290f-4320-992d-eee7750c9952.gif)


#### Não permitir rolagem em ocasiões específicas

Ao abrir uma janela modal ou um menu mobile que é fixo e preenche toda a tela é interessante não permitir que o usuário faça o scroll da página, já que o que está sendo exibido dá a impressão que está por cima do documento.

Ao definir `overflow: hidden` ao `body` a barra de rolagem é ocultada e o problema é resolvido no desktop. Entretanto em navegadores mobile ainda é possível dar o scroll na página. Para resolver isso, o simples CSS abaixo é o suficiente:

```scss
.modal-scrollbar {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
}
```

`Left` e `right` é apenas para o `body` continuar com sua largura de ponta a ponta. A classe é adicionada ao `body` sempre que um modal ou um menu mobile fixo está aberto.