import Image from 'next/image';
import useTranslation from '../../hook/useTranslation';
import PostScreenWrapper from './styles';

export type PostScreenProps = {
  post: {
    title: string;
    summary: string;
    description: string;
    thumbnail: {
      url: string;
    }
  }
}

export default function PostScreen({ post }: PostScreenProps) {
  const { t } = useTranslation({
    en: { imgAlt: 'project image' },
    pt: { imgAlt: 'imagem do projeto' },
  });

  return (
    <PostScreenWrapper>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.summary }} />
      <Image
        src={post.thumbnail.url}
        alt={t('imgAlt')}
        width={1280}
        height={720}
        placeholder="blur"
        blurDataURL="/logo.svg"
      />
      <div dangerouslySetInnerHTML={{ __html: post.description }} />
    </PostScreenWrapper>
  );
}
