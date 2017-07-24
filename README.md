Este repositório é um estudo do framework [Draft.js](https://draftjs.org/), desenvolvído para construção de editores através do [React](https://facebook.github.io/react/).

# Entities

Entities são objetos representados por uma parte específica de texto criado através do editor, que carrega algumas informações, além de seu estilo próprio. Links, hashtags e menções, são alguns exemplos de entities.

* [Artigo](https://draftjs.org/docs/advanced-topics-entities.html)
* [Documentação](https://draftjs.org/docs/api-reference-entity.html)
* [Examplo | Link editor](https://codepen.io/Kiwka/pen/ZLvPeO?editors=1111)
* [Examplo | Entity demo](https://codepen.io/Kiwka/pen/wgpOoZ?editors=1111)

Uma entity possui três propriedades:

* `type`: Uma string que indica o seu tipo;
* `mutability`: Representa o seu comportamento. Existem três tipos:
  - ##Immutable##: Ao apagar ou adicionar algum qualquer caracter, toda entity será removida.
  - ##Mutable##: Qualquer caracter pode ser adicionado ou removido;
  - ##Segmented##: Parecida com `Immutable`, porém a entity é segmentada em mais de um elemento. Por exemplo, uma entity do `type: MENTION`, com o nome `Jason Newsted`. Ela possui dois segmentos: ao adicionar um caracter em algum segmento, toda entity será removida. Ao remover um caracter de algum segmento, apenas aquele segmento será removido.
* `data`: Recebe um objeto opcional, que pode conter informações úteis para uma entity. Por exemplo, em uma entity do `type: LINK`, a propriedade `data` poderia receber um `href`.






# Decorators

Além de estilos inline e em bloco, a outra forma de estilizar um elemento é através de Decorators. É uma forma de aplicar estilos direto ao texto, toda vez que o editor sofrer qualquer tipo de alteração.

* [Artigo](https://draftjs.org/docs/advanced-topics-decorators.html)
* [Exemplo | Tweet](https://codepen.io/Kiwka/pen/KaZERV?editors=1010#0)

A ideia do CompositeDecorator é encontrar e estilizar uma parte específica do conteúdo de um ContentBlock e renderizar um component do React.

Para criar um decorator, é necessário passar como parametro um array de objetos, sendo que cada objeto possua duas chaves:
* `strategy`: um método que irá percorrer o ContentBlock e irá identificar a parte do texto que deverá ser "decorada". O método deve receber dois parâmetros: ContentBlock e callback. O callback será executado toda vez que for encontrado o texto que deverá ser "decorado". Esse texto é obtido através do ContentBlock.
* `component`: Um componente que irá ser aplicado ao texto.

Após um decorator ser criado, ele deve ser passado como parametro na criação do EditorState:

`this.state = { editorState: EditorState.createEmpty(decorator) }`

ou

`this.state = { editorState: EditorState.createWithContent(blocks, decorator) }`