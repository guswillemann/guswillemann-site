import Image from 'next/image';
import PostCardWrapper from './styles';
import { PostCardVariants as PostCardVariantsType } from './styles/postCardStyleMap';

export type PostCardVariants = PostCardVariantsType;

export type PostCardData = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail: {
    url: string;
  };
};

type PostCardProps = {
  postData: PostCardData;
  variant: PostCardVariants;
  pathName: string;
};

export default function PostCard({ variant, postData, pathName }: PostCardProps) {
  return (
    <PostCardWrapper variant={variant}>
      <Image
        className="post-thumbnail"
        src={postData.thumbnail.url}
        alt="Imagem do projeto"
        width={1280}
        height={720}
        placeholder="blur"
        blurDataURL="/logo.svg"
      />
      <div className="post-info">
        <p className="post-title">{postData.title}</p>
        <div className="post-summary-container">
          <div className="post-summary" dangerouslySetInnerHTML={{ __html: postData.summary }} />
        </div>
        <a href={`${pathName}/${postData.slug}`}>mais detalhes</a>
      </div>
    </PostCardWrapper>
  );
}
