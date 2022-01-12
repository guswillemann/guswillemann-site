import Image from 'next/image';
import { StructuredText, StructuredTextDocument } from 'react-datocms';
import useTranslation from '../../hook/useTranslation';
import customizeLinkRule from '../../services/cms/utils/customizeLinkRule';
import Link from '../Link';
import * as en from './i18n/en.json';
import * as pt from './i18n/pt.json';
import PostCardWrapper from './styles';
import { PostCardVariants as PostCardVariantsType } from './styles/postCardStyleMap';


export type PostCardVariants = PostCardVariantsType;

export type PostCardData = {
  id: string;
  title: string;
  slug?: string;
  repoUrl?: string;
  deployUrl?: string;
  summary: StructuredTextDocument;
  thumbnail: any;
};

type PostCardProps = {
  postData: PostCardData;
  variant: PostCardVariants;
  pathName: string;
  type?: 'article' | 'project';
};

export default function PostCard({ variant, postData, pathName, type = 'article' }: PostCardProps) {
  const { t } = useTranslation({ en, pt });

  return (
    <PostCardWrapper variant={variant}>
      <Image
        className="post-thumbnail"
        src={postData.thumbnail.url}
        alt={postData.thumbnail.alt}
        width={1280}
        height={720}
        objectFit="contain"
        placeholder="blur"
        blurDataURL={postData.thumbnail.blurUpThumb || '/logo.svg'}
      />
      <div className="post-info">
        <p className="post-title">{postData.title}</p>
        <div className="post-summary-container">
          <div className="post-summary">
            <StructuredText
              data={postData.summary}
              customRules={[customizeLinkRule('tech-link')]}
            />
          </div>
        </div>
        
        <div className="post-links-container">
        {type === 'article'
          ? <Link className="post-link" href={`${pathName}/${postData.slug}`}>{t('articleLink')}</Link>
          : (
            <>
              <Link className="post-link" href={postData.deployUrl}>{t('deployLink')}</Link>
              <Link className="post-link" href={postData.repoUrl}>{t('repoLink')}</Link>
            </>
            )
          }
        </div>

      </div>
    </PostCardWrapper>
  );
}
