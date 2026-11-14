import type { ProjectImage } from './content';

type ProjectGalleryProps = {
  label: string;
  images: ProjectImage[];
};

export default function ProjectGallery({ label, images }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="project-gallery" role="group" aria-label={label}>
      {images.map((image) => (
        <figure className="project-gallery-item" key={image.src}>
          <a
            className="project-gallery-image-link"
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={'Open full-size image: ' + (image.caption || image.alt)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          </a>
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
