import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelTrip,
  completeTrip,
  createTrip,
  fetchTrips,
  updateTripStatus,
} from "../api/tripApi";

const TRIPS_KEY = ["trips"];

export function useTrips() {
  const queryClient = useQueryClient();

  const tripsQuery = useQuery({
    queryKey: TRIPS_KEY,
    queryFn: fetchTrips,
    staleTime: 15_000,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: TRIPS_KEY });

  const addTrip = useMutation({
    mutationFn: createTrip,
    onSuccess: invalidate,
  });

  const changeTripStatus = useMutation({
    mutationFn: ({ id, status }) => updateTripStatus(id, status),
    onSuccess: invalidate,
  });

  const finishTrip = useMutation({
    mutationFn: ({ id, details }) => completeTrip(id, details),
    onSuccess: invalidate,
  });

  const removeTrip = useMutation({
    mutationFn: cancelTrip,
    onSuccess: invalidate,
  });

  return {
    trips: tripsQuery.data ?? [],
    isLoading: tripsQuery.isLoading,
    isError: tripsQuery.isError,
    error: tripsQuery.error,
    addTrip,
    changeTripStatus,
    finishTrip,
    cancelTrip: removeTrip,
  };
}
