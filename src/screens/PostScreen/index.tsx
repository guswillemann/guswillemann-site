import Image from 'next/image';
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
  return (
    <PostScreenWrapper>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.summary }} />
      <Image
        src={post.thumbnail.url}
        alt="Imagem do projeto"
        width={1280}
        height={720}
        placeholder="blur"
        blurDataURL="/logo.svg"
      />
      <div dangerouslySetInnerHTML={{ __html: post.description }} />
    </PostScreenWrapper>
  );
}
