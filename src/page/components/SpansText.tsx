type PrivateProps = {
  text: string;
  spanClass?: string;
};

export function SpansText({ text, spanClass = "span" }: PrivateProps) {
  return (
    <>
      {text.split("").map((letter, index) => {
        if (letter === " ") {
          return <span key={index}>&nbsp;</span>;
        }
        return (
          <span key={index} className={spanClass}>
            {letter}
          </span>
        );
      })}
    </>
  );
}
