import Image from 'next/image';
import { StructuredText, StructuredTextDocument, StructuredTextGraphQlResponseRecord } from 'react-datocms';
import customizeLinkRule from '../../services/cms/utils/customizeLinkRule';
import PostScreenWrapper from './styles';

type ImageData = {
  url: string;
  alt: string;
  width: number;
  height: number;
  blurUpThumb: string;
};

interface CMSImageRecord extends StructuredTextGraphQlResponseRecord {
  file: ImageData;
}

interface CMSVideoRecord extends StructuredTextGraphQlResponseRecord {
  src: { providerUid: string }
}

export type PostScreenProps = {
  post: {
    title: string;
    summary: StructuredTextDocument;
    description: StructuredTextDocument;
    thumbnail: ImageData;
  };
};

export default function PostScreen({ post }: PostScreenProps) {
  return (
    <PostScreenWrapper>
      <h1>{post.title}</h1>
      <StructuredText
        data={post.summary}
        customRules={[customizeLinkRule()]}
      />
      <div className="img-container">
        <Image
          src={post.thumbnail.url}
          alt={post.thumbnail.alt}
          width={post.thumbnail.width}
          height={post.thumbnail.height}
          placeholder="blur"
          blurDataURL={post.thumbnail.blurUpThumb}
        />
      </div>
      <StructuredText
        data={post.description}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case 'ImageRecord':
              const imageRecord = record as CMSImageRecord;
              return (
                <div className="img-container">
                  <Image
                    src={imageRecord.file.url}
                    alt={imageRecord.file.alt}
                    width={imageRecord.file.width}
                    height={imageRecord.file.height}
                    placeholder="blur"
                    blurDataURL={imageRecord.file.blurUpThumb}
                  />
                </div>
              )
            case 'VideoRecord':
              const videoRecord = record as CMSVideoRecord;
              return (
                <iframe
                  width="560"
                  height="315"
                  src={`https://youtube.com/embed/${videoRecord.src.providerUid}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              );
            default:
              return null;
          }
        }}
        customRules={[customizeLinkRule()]}
      />
    </PostScreenWrapper>
  );
}
