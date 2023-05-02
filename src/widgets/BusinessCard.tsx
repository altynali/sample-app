import { Persona, PersonaSize, mergeStyleSets } from "@fluentui/react";
import React, { FC } from "react";
import { TContact } from "../eWayAPI/ContactsResponse";

type BusinessCardProps = {
  imageUrl?: string;
  imageAlt?: string;
  imageInitials?: string;
  text?: string | undefined;
  secondaryText?: string;
  tertiaryText?: string;
  optionalText?: string;
  user: TContact;
};

const css = mergeStyleSets({
  personaDiv: {
    border: "1px solid gray",
  },
});

const BusinessCard: FC<BusinessCardProps> = ({ user, ...otherProps }) => {
  return (
    <div className={css.personaDiv}>
      <Persona
        size={PersonaSize.size120}
        imageUrl={`
        data:image/png;base64,${user.ProfilePicture}`}
        text={user.FileAs as string}
        {...otherProps}
      />
    </div>
  );
};

export default BusinessCard;
