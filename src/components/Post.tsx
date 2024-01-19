/*eslint-disable*/

import { format, formatDistanceToNow, set } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';
import { FormEvent, ChangeEvent, useState, InvalidEvent } from 'react';

interface Author {
    avatarUrl: string;
    name: string;
    role: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    id: number,
    author: Author, //podia colocar o author como um objeto, mas assim fica mais legível
    publishedAt: Date,
    content: Content[]
}

interface PostProps {
    post: PostType,
}



export function Post({ post }: PostProps) {

    const [comments, setComments] = useState([
        'Post deveras bacana risos risos!'
    ]);

    const [newCommentText, setNewCommentText] = useState('');

    console.log(newCommentText)

    const publishedDateFormated = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true //adiciona o 'há' antes da data
    });

    /* tudo que vem de evento do html toma event como primeiro parâmetro, e aqui organizamos isso nas funções handle
     * basta adicionar o event como parametro e pegar o tipo de evento que queremos
    */

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    //ChangeEvent<HTMLTextAreaElement> é uma aplicação de generics, que é um tipo de tipagem que permite que a gente passe um tipo para dentro de um componente
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })
        setComments(commentsWithoutDeletedOne);

    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('O comentário não pode ser vazio!');
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>

                    <Avatar
                        src={post.author.avatarUrl}
                        alt=""
                    />

                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time
                    title={publishedDateFormated}
                    dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="">{line.content}</a></p>
                    }
                })}

            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback!</strong>

                <textarea
                    name='comment'
                    value={newCommentText}
                    placeholder='Deixe seu comentário :)'
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button
                        disabled={isNewCommentEmpty}
                        type='submit'>Comentar
                    </button>
                </footer>

            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment
                        key={comment}
                        content={comment}
                        onDeleteComment={deleteComment}

                    />
                })}
            </div>
        </article>
    );
}
