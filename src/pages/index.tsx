import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { FiUser, FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  console.log(postsPagination);

  return (
    <>
      <Head>
        <title>Spacetraveling</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {postsPagination.results.map(post => (
            <a href="#" key={post.uid}>
              <strong>{post.data.title}</strong>
              <p>{post.data.subtitle}</p>
              <div className={styles.postInfo}>
                <div>
                  <span>
                    <FiCalendar size={20} />
                  </span>
                  <time>{post.first_publication_date}</time>
                </div>
                <div>
                  <span>
                    <FiUser size={20} />
                  </span>
                  <span>{post.data.author}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

/**
 * Utilizar o método query para retornar todos os posts já com paginação.
 * Por padrão, a paginação vem configurada como 20.
 * Portanto se quiser testar sem ter que criar mais de 20 posts
 * , altere a opção pageSize para o valor que deseja.
 */

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 100,
    }
  );

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
      data: post.data,
    };
  });

  const postsPagination = {
    next__page: postsResponse.next_page,
    results,
  };

  return {
    props: {
      postsPagination,
    },
  };
};

/**
 * format(
	new Date(),
	"'Hoje é' eeee",
	{
		locale: ptBR,
	}
)
 */
