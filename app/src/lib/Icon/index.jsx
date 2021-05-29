export default function Icon({ title, Icon, fontSize = 16, color = '#222', ...rest }) {
  return (
    <div {...rest}>
      <Icon
        fontSize={fontSize}
        color={color}
      />
    </div>
  )
}