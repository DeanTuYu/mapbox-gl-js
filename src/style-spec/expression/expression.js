// @flow

import type {Type} from './types';
import type ParsingContext from './parsing_context';
import type EvaluationContext from './evaluation_context';

type SerializedExpression = Array<mixed> | string | number | boolean | null;

export interface Expression {
    +type: Type;

    evaluate(ctx: EvaluationContext): any;

    eachChild(fn: Expression => void): void;

    /**
     * Statically analyze the expression, attempting to enumerate possible outputs. Returns
     * false if the complete set of outputs is statically undecidable, otherwise true.
     */
    outputDefined(): boolean;

    serialize(): SerializedExpression;
}

export type ExpressionParser = (args: $ReadOnlyArray<mixed>, context: ParsingContext) => ?Expression;
export type ExpressionRegistration = Class<Expression> & { +parse: ExpressionParser };
export type ExpressionRegistry = {[_: string]: ExpressionRegistration};
