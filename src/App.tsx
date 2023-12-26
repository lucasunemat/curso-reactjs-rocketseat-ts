/*eslint-disable*/

import { Post, PostType } from './components/Post'; // Importamos o componente Post
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';
import './global.css' //sempre importar os estilos nos arquivos javascript

//author: avata_url, name, role;
//publishedAt: Date;
//content: String;

const posts : PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/lucasunemat.png',
      name: 'Lucas Batista',
      role: 'Analista de Sistemas @ DATAPREV'
    },
    content: [
      { type: 'paragraph', content: 'Dois hamburgueres alface queijo molho especial cebola picles e um pao com gergelim. ' },
      { type: 'paragraph', content: 'Numquam dolorem eius repellendus commodi fuga molestias dicta,' },
      { type: 'paragraph', content: 'sint voluptates, quos perferendis, sit quod? Voluptatum ut excepturi ' },
      { type: 'link', content: 'vero dolore ratione' },
      { type: 'paragraph', content: 'soluta ea!' }
    ],
    publishedAt: new Date('2023-05-11 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'PO @ DATAPREV'
    },
    content: [
      { type: 'paragraph', content: 'É BIG MAAAAAAAAAAAAAAAAAAAAAC. É BIG MAAAAAAAAAAAAAAAAAAAAC' },
      { type: 'paragraph', content: 'Numquam dolorem eius repellendus commodi fuga molestias dicta,' },
      { type: 'paragraph', content: 'sint voluptates, quos perferendis, sit quod? Voluptatum ut excepturi ' },
      { type: 'link', content: 'vero dolore ratione' },
      { type: 'paragraph', content: 'soluta ea!' }
    ],
    publishedAt: new Date('2023-05-11 20:30:00')
  },
]

export function App() { //componentes sempre com letra maiuscula para não confundir com html
  //impossível renderizar varios componentes sem ter outro componente que os englobe (nesse caso, div)
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post //componente com iterações dentro dele que vão gerar outros componentes
                key={post.id} //identificador de cada post para evitar o erro "all children must have a key prop"
                post={post} //passando o post como propriedade para o componente Post
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}




