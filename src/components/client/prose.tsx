export default function Prose(props: any) {
  const { className, html } = props;
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}
