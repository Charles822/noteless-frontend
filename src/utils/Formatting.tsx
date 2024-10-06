  // Create a link for youtube urls
  
  export const UrlLink = ({ url }: { url: string }) => {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className='underline decoration-rose-700 text-rose-700'>
        Video Link
      </a>
    );
  };

  export const TextWithLineBreaks = ({ text }: { text: string }) => {
  return (
    <div className="text-sm text-stone-600">
      {text.split('\n').map((line: string, index: number) => (
        <p key={index}>
          {line}
          <br />
        </p>
      ))}
    </div>
  );
};