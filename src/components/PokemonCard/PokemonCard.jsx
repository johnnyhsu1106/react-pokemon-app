import { Card, Button } from 'react-bootstrap';
import PokemonTypes from './PokemonTypes';
import PokemonStatsList from './PokemonStatsList';
import { usePokemonContext } from '../../context/PokemonContext';
import { useViewportContext } from '../../context/ViewportContext';


const PokemonCard = () => {
  const {
    isLoading,
    isError,
    isCaptureButtonDisabled,
    pokemon,
    selectedPokemonName,
    handlePokemonCapture
  } = usePokemonContext();
  const { isMobile } = useViewportContext();
  
  if (isLoading) {
    return (
      <p className='text-center pokemon-card'>Search for pokemon {selectedPokemonName} ...</p>
    )
  };
  if (isError) {
    return (
      <p className='text-center pokemon-card'>Couldn't find this Pokemon {selectedPokemonName}</p>
    ) 
  };


  return ( 
    <Card className='bg-dark text-white pokemon-card'>
      <Card.Img className='pokemon-image' variant='top' src={pokemon?.image} />
      <Card.Body>
        <Card.Title className='text-capitalize text-center'>{pokemon?.name || ''}</Card.Title>
        <Card.Text>Order: {pokemon?.order}</Card.Text>
        <PokemonTypes types={pokemon?.types || []} />
        <PokemonStatsList stats={pokemon?.stats || []} />
        <Button
            className={`w-100 ${isMobile ? 'mt-0' : 'mt-4'}`}
            variant={`${isCaptureButtonDisabled ? 'light' : 'success'}`}
            disabled={isCaptureButtonDisabled}
            onClick={isCaptureButtonDisabled ? () => {} :  () => { handlePokemonCapture(pokemon) }} 
          >
            {isCaptureButtonDisabled ? 'Pocket is full' : 'Capture'}
          </Button>
      </Card.Body>
    </Card>

  )
}

export default PokemonCard;
