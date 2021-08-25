import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

/**
 * Utilizar o método query para buscar todos os posts
 * e o getByUID para buscar as informações do post específico.
 */

export default function Post({ post }: PostProps): JSX.Element {
  console.log(JSON.stringify(post, null, 2));

  return (
    <>
      <Head>
        <title>Spacetraveling</title>
      </Head>
      <main className={`${styles.container} ${commonStyles.commonContainer}`}>
        <div className={styles.image}>
          <img src={post.data.banner.url} alt="Banner do post" />
        </div>
        <div className={styles.pageContainer}>
          <h1>{post.data.title}</h1>
          <div className={styles.postMeta}>
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
            <div>
              <span>
                <FiClock size={20} />
              </span>
              <span>4 min</span>
            </div>
          </div>
          {post.data.content.map(content => (
            <div className={styles.contentContainer}>
              <h2>{content.heading}</h2>
              <div
                className={styles.contentBodyText}
                dangerouslySetInnerHTML={{ __html: String(content.body) }}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query();
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: response.data.title,
      banner: { url: response.data.banner?.url },
      author: response.data.author,
      content: response.data.content.map(itemContent => {
        return {
          heading: itemContent.heading,
          body: RichText.asHtml(itemContent.body),
        };
      }),
    },
  };

  return {
    props: { post },
  };
};
