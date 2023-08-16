import Link from 'next/link';

export const LinkButton = ({ href, text }) => {
  return (
    <div className="btn-more">
      <Link href={href}>{text}</Link>
    </div>
  );
};
