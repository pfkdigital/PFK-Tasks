import { JWTPayload, JWSHeaderParameters } from "jose";

export interface TokenVerificationResult {
  payload: JWTPayload;
  protectedHeader: JWSHeaderParameters;
}