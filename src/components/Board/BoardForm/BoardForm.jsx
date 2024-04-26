import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Icon, Image, ThemeContext } from '../..';
import { boardIcons, boardImgIcons } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { editBoardSchema } from '../../../schemas/editBoardSchema';
import {
  createBoardThunk,
  selectBoardById,
  updateBoardByIdThunk,
} from '../../../redux';

import {
  SButton,
  SContainer,
  SFieldWrapp,
  SForm,
  SImgContainer,
  SInput,
  SLabel,
  SPLabel,
  SRadio,
  SRadioContainer,
  STitle,
} from './BoardForm.styled';

export const BoardForm = ({ boardId, handleCloseModal }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => selectBoardById(state, boardId));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editBoardSchema),
    defaultValues: {
      title: board?.title,
      icon: board?.icon,
      backgroundImage: board?.backgroundImage,
    },
    mode: 'onChange',
  });
  const boardImageIcons = boardImgIcons.filter((image) =>
    image.themes.includes(theme)
  );
  const imageSize = {
    width: 28,
    height: 28,
  };

  const onSubmit = (data) => {
    if (boardId) {
      dispatch(updateBoardByIdThunk({ newBoardBody: data, id: boardId }))
        .unwrap()
        .then(() => {
          handleCloseModal();
        });
    } else {
      dispatch(createBoardThunk(data))
        .unwrap()
        .then(() => {
          handleCloseModal();
        });
    }
  };

  return (
    <SContainer>
      <SForm onSubmit={handleSubmit(onSubmit)}>
        <STitle>{board ? 'Edit board' : 'New board'}</STitle>
        <SInput type="text" autoFocus={true} {...register('title')} />
        <SFieldWrapp>
          <SPLabel>Icons</SPLabel>
          <SRadioContainer $gap={'3px'}>
            {boardIcons.map((iconId) => (
              <SLabel key={iconId}>
                <SRadio type="radio" {...register('icon')} value={iconId} />
                <Icon
                  id={iconId}
                  size={24}
                  stroke="rgba(255, 255, 255, 0.5)"
                  fill="rgba(0, 0, 0, 0)"
                />
              </SLabel>
            ))}
          </SRadioContainer>
        </SFieldWrapp>
        <SFieldWrapp>
          <SPLabel>Background</SPLabel>
          <SRadioContainer $width={'252px'} $gap={'4px'}>
            {boardImageIcons.map((image) => (
              <SLabel key={image.key}>
                <SRadio
                  type="radio"
                  {...register('backgroundImage')}
                  value={image.key}
                />
                {
                  <Image
                    desktop={imageSize}
                    tablet={imageSize}
                    mobile={imageSize}
                    type="image/png"
                    pathKey={image.key}
                    alt={image.alt}
                    imageCategory={'boardIcons'}
                  />
                }
              </SLabel>
            ))}
          </SRadioContainer>
        </SFieldWrapp>
        <SButton>
          <Button
            title={board ? 'Edit' : 'Create'}
            icon={true}
            size={'large'}
            style={{ width: 3340 }}
          />
        </SButton>
      </SForm>
    </SContainer>
  );
};