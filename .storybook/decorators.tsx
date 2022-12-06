import {DecoratorFn} from "@storybook/react";

export const withMaxWidth: DecoratorFn = (StoryFn) => {
    return (
        <div style={{display: "flex", maxWidth: 450, minHeight: 200, margin: '0 auto', border: "1px solid pink"}}>
            <div style={{maxWidth: "max-content", margin: "auto"}}>
                <StoryFn/>
            </div>
        </div>
    )
}

export const globalDecorators = [withMaxWidth]