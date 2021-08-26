import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Prismic from '@prismicio/client';

import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  const words = post?.data?.content.reduce((acc, item) => {
    const sizeOfHeading = item.heading.split(' ').length;
    const sizeOfBody = RichText.asText(item.body).split(' ').length;
    return acc + sizeOfHeading + sizeOfBody;
  }, 0);

  const timeToRead = Math.ceil(words / 200);

  return (
    <>
      <Head>
        <title>Spacetraveling</title>
      </Head>
      {router.isFallback ? (
        <title>Carregando...</title>
      ) : (
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
                <time>
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>
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
                <span>{timeToRead} min</span>
              </div>
            </div>
            {post.data.content.map((content, idx) => (
              <div className={styles.contentContainer} key={content.heading}>
                <h2>{content.heading}</h2>
                <div
                  className={styles.contentBodyText}
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </div>
            ))}
          </div>
        </main>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'posts'),
  ]);

  const hotSlugs = [
    'facilitando-sua-vida-no-next.js',
    'como-utilizar-hooks',
    'criando-um-app-cra-do-zero',
  ];

  const results = posts.results
    .map(post =>
      hotSlugs.includes(post.uid)
        ? {
            params: { slug: post.uid },
          }
        : null
    )
    .filter(post => post !== null);

  // console.log(JSON.stringify(results, null, 2));

  return {
    paths: results,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      banner: { url: response.data.banner?.url },
      author: response.data.author,
      content: response.data.content.map(itemContent => {
        return {
          heading: itemContent.heading,
          body: itemContent.body,
        };
      }),
      subtitle: response.data.subtitle,
    },
    uid: response.uid,
  };

  return {
    props: {
      post,
    },
    redirect: 60 * 30,
  };
};
