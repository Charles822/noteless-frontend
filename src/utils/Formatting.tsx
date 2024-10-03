  // Create a link for youtube urls
  
  export const UrlLink = ({ url }) => {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className='underline decoration-rose-700 text-rose-700'>
        Video Link
      </a>
    );
  };

  export const TextWithLineBreaks = ({ text }) => {
  return (
    <div className="text-sm text-stone-600">
      {text.split('\n').map((line, index) => (
        <p key={index}>
          {line}
          <br />
        </p>
      ))}
    </div>
  );
};