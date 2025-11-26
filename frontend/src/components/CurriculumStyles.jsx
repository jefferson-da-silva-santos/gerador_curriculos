import useTheme from "../hooks/useTheme";

const CurriculumStyles = () => {
  const { themeObject } = useTheme();
  return <style dangerouslySetInnerHTML={{ __html: themeObject.styles }} />;
};

export default CurriculumStyles;
