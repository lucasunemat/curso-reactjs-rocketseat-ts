/*eslint-disable*/

import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps {
    content: string;
    onDeleteComment: (content: string) => void; //a função tanto aqui quanto em post é do tipo void, porque não retorna nada
}

export function Comment({ content, onDeleteComment }: CommentProps) {

    //o componente vai mudar a partir de interação do usuário? ==> use o useState()
    const [likeCount, setLikeCount] = useState(0);

    function handleNewComment() {
        //setLikeCount(likeCount + 1);
        //setLikeCount(likeCount + 1);
        /**
         * Não adianta colocar varios setLikeCount porque aqui estamos trabalhando com o contexto onde o likeCount é 0
         * Ou seja, até que essa função seja completamente executada, o likeCount vai continuar sendo 0.
         * Não importa quantas vezes você chame o setLikeCount, ele só vai ser atualizado quando a função for completamente executada
         * Para resolver isso, você vai precisar usar uma função que pega sempre o contexto mais atual do likeCount (variavel state)
         */

        //nesse exemplo abaixo, se eu descomentar a função e deixar duas, vai atualizar de 2 em 2
        setLikeCount((state) => {
            return state + 1;
        })
        /*
        setLikeCount((state) => {
            return state + 1;
        })
        */
    }

    function handleDeleteComment() {
        onDeleteComment(content);
        //a onDeleteComment(content) chama a função deleteComment que está no Post.jsx passando o conteudo do comentario
        //o ideal seria o id do comentario, mas aqui usamos o content por não termos um backend
        //aqui estamos refernciando o content de cada componente Comment, o que faz o conteudo aparecer no alert
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/lucasunemat.png" alt="" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Lucas</strong>
                            <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">Cerca de uma hora atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleNewComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}

/*
 * Conceito: funcao !== funcao()
    * Uma é a funcao em si, a outra é a execução da funcao
    * Se você usar funcao() o react vai executar a funcao assim que o componente for renderizado. SEM ESPERAR O CLIQUE DO USUÁRIO
    * E isso vai gerar um loop infinito de renderização
    * A solução seria : onClick={() => funcao()}. Por que assim a funcao só vai ser executada quando o usuário clicar no botão
        * Quando a função estiver vendo o primeiro () ela entende que precisa esperar alguma coisa, alguma ação (no caso, o clique do usuário)
*/