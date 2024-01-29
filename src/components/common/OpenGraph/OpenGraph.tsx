interface OpenGraphProps {
  title: string | null;
  type: string | null;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 100,
    width: '100%',
    height: '100%',
    backgroundColor: '#4b84b4',
    textAlign: 'center',
  },
  heading: {
    padding: '0 60px',
    fontSize: 70,
    color: 'white',
    wordBreak: 'keep-all',
  },
  subHeading: { fontSize: 36, color: 'white' },
} as const;

const OpenGraphComponent = ({ title, type }: OpenGraphProps) => {
  const HEADING = 'moonkorea | Tech Blog';
  return (
    <div style={styles.container}>
      <div style={styles.heading}>{title ? decodeURI(title) : HEADING}</div>
      {type === 'post' && <div style={styles.subHeading}>{HEADING}</div>}
    </div>
  );
};

export default OpenGraphComponent;
