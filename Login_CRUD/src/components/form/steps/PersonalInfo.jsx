import '../../../styles/components/steps/personalinfo.sass'

const PersonalInfo = () => {
  return (
    <div className="personal-info-container">
      <form>
      <input type="text" placeholder="Insira seu nome" />
      <input type="text" placeholder="Insira seu sobrenome"/>
      </form>
    </div>
  )
}

export default PersonalInfo